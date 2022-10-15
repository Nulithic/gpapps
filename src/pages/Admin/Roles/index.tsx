import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { addRole, deleteRole, getRoles } from "@/services/adminService";
import { Role } from "@/types/AuthType";

import TreeView from "./TreeView";
import AddRoleModal from "./AddRole";
import DeleteRoleModal from "./DeleteRole";

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<Role>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const handleAddRole = async (name: string, parent: string | null) => {
    const lowerCase = name.charAt(0).toLowerCase() + name.slice(1);
    const roleCase = lowerCase.replace(/\s+/g, "");

    try {
      const res = await addRole(roleCase, name, parent);
      console.log(res.data);
      toast.success(`${name} was added.`);
      setRoles(res.data.roles);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message ?? `Failed to add ${name}`);
    }
    closeAddModal();
  };

  const handleDeleteRole = async (role: Role) => {
    console.log("delete", role);
    const res = await deleteRole(role);
    if (res.status == 200) {
      console.log(res.data);
      toast.success(`${role.name} was deleted.`);
      setRoles(res.data.roles);
    } else toast.error(`Failed to delete ${role.name}`);
    closeDeleteModal();
  };

  const handleSelected = (role: Role, id: string) => {
    setSelected(role);
    if (id === "delete") setDeleteModal((prev) => !prev);
    else setAddModal((prev) => !prev);
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
    const handleRoles = async () => {
      const res = await getRoles();
      if (res.status == 200) setRoles(res.data.roles);
      else console.log("API Error");
    };

    handleRoles();
  }, []);

  return (
    <>
      <AddRoleModal selected={selected} addRole={handleAddRole} addModal={addModal} closeAddModal={closeAddModal} />
      <DeleteRoleModal selected={selected} deleteRole={handleDeleteRole} deleteModal={deleteModal} closeDeleteModal={closeDeleteModal} />
      <div className="flex flex-col w-1/4 space-y-2">
        <button className="btn gap-2" id="add" onClick={() => setAddModal(true)}>
          <PlusIcon className="h-4 w-4" /> Add Role
        </button>
        <div className="menu bg-base-300 p-4 space-y-1 rounded">
          {roles.length > 0 ? roles.map((item, i) => <TreeView key={i} item={item} handleSelected={handleSelected} />) : null}
        </div>
      </div>
    </>
  );
};

export default Roles;
