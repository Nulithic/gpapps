import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { getUsers, addUser, deleteUser, updateUserRole } from "@/services/adminService";
import { User, Role } from "@/types/AuthType";

import UserView from "./UserView";
import TreeView from "./TreeView";
import AddUserModal from "./AddUser";
import DeleteUserModal from "./DeleteUser";

const createRoleList = (roles: Role[]) => {
  const roleList: Role[] = [];
  const list = JSON.parse(JSON.stringify(roles));

  for (const item of list) {
    if (item.parent === "") roleList.push(item);
  }

  const addChildren = (roleItem: Role) => {
    for (const item of list) {
      if (roleItem.role === item.parent) {
        roleItem.children.push(item);
        addChildren(item);
      }
    }
  };

  for (const roleItem of roleList) {
    addChildren(roleItem);
  }

  return roleList;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const handleAddUser = async (username: string, password: string) => {
    try {
      const res = await addUser(username, password);
      console.log(res.data);
      toast.success(`${username} was added.`);
      setUsers(res.data.users);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message ?? `Failed to add ${username}`);
    }
    closeAddModal();
  };

  const handleDeleteRole = async (user: User) => {
    const res = await deleteUser(user.username);
    if (res.status == 200) {
      console.log(res.data);
      toast.success(`${user.username} was deleted.`);
      setUsers(res.data.users);
    } else toast.error(`Failed to delete ${user.username}`);
    closeDeleteModal();
  };

  const handleSelected = (user: User, id?: string) => {
    if (selected) setSelected(undefined);
    setSelected(user);
    if (id === "delete") setDeleteModal((prev) => !prev);
  };

  const handleUpdateRole = async (role: Role) => {
    if (selected) {
      const res = await updateUserRole(selected.username, role._id);
      if (res.status == 200) {
        console.log(res.data);
        toast.success(`${role.name} was updated.`);
        setSelected(res.data.user);
      } else toast.error(`Failed to update ${role.name}`);
    }
  };

  const closeDeleteModal = () => {
    setSelected(undefined);
    setDeleteModal(false);
  };

  const closeAddModal = () => {
    setSelected(undefined);
    setAddModal(false);
  };

  useEffect(() => {
    const handleUsers = async () => {
      const res = await getUsers();
      if (res.status == 200) setUsers(res.data.users);
      else console.log("API Error");
    };

    handleUsers();
  }, [selected]);

  return (
    <>
      <AddUserModal addUser={handleAddUser} addModal={addModal} closeAddModal={closeAddModal} />
      <DeleteUserModal selected={selected} deleteUser={handleDeleteRole} deleteModal={deleteModal} closeDeleteModal={closeDeleteModal} />
      <div className="flex flex-col w-full items-center space-y-2">
        <button className="btn gap-2 w-1/4" id="add" onClick={() => setAddModal(true)}>
          <PlusIcon className="h-4 w-4" /> Add User
        </button>

        <div className="flex flex-row w-1/2 space-x-2">
          <div className="menu bg-base-300 w-full h-fit p-4 space-y-1 rounded">
            {users.length > 0 ? users.map((user, i) => <UserView key={i} user={user} selected={selected} handleSelected={handleSelected} />) : null}
          </div>

          {selected ? (
            <div className="menu bg-base-300 w-full p-4 space-y-1 rounded">
              {createRoleList(selected.roles).map((role, i) => (
                <TreeView key={i} item={role} handleUpdateRole={handleUpdateRole} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Users;
