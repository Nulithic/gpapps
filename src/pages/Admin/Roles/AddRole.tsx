import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

import { Role } from "@/types/AuthType";

interface ModalProps {
  addModal: boolean;
  selected: Role | undefined;
  addRole: (name: string, parent: string | null) => void;
  closeAddModal: () => void;
}

const AddRoleModal = ({ addModal, selected, addRole, closeAddModal }: ModalProps) => {
  const [newRole, setNewRole] = useState("");

  const updateNewRole = (event: ChangeEvent<HTMLInputElement>) => {
    setNewRole(event.target.value);
  };

  const addNewRole = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(newRole);
    if (newRole === "") return toast.error("Role name missing.");
    if (selected) {
      setNewRole("");
      return addRole(newRole, selected.role);
    } else {
      setNewRole("");
      return addRole(newRole, "");
    }
  };

  const closeModal = () => {
    setNewRole("");
    closeAddModal();
  };

  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={addModal} readOnly />
      <div className="modal">
        <div className="modal-box w-2/12">
          <h3 className="font-bold text-lg">Add Role</h3>
          <p className="py-4">{selected?.name}</p>
          <form onSubmit={addNewRole}>
            <input type="text" placeholder="Role Name" className="input input-bordered w-full max-w-xs" value={newRole} onChange={updateNewRole} />
            <div className="modal-action">
              <button className="btn btn-ghost" type="reset" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoleModal;
