import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

import { Role } from "@/types/authType";

interface ModalProps {
  addModal: boolean;
  selected: Role | undefined;
  addRole: (roleName: string, selected?: Role) => void;
  closeAddModal: () => void;
}

const AddRoleModal = ({ addModal, selected, addRole, closeAddModal }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [roleName, setRoleName] = useState("");

  const updateNewRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRoleName(event.target.value);
  };

  const addNewRole = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roleName === "") return toast.error("Role name missing.");
    if (selected) {
      setRoleName("");
      return addRole(roleName, selected);
    } else {
      setRoleName("");
      return addRole(roleName);
    }
  };

  const closeModal = () => {
    setRoleName("");
    closeAddModal();
  };

  useEffect(() => {
    if (inputRef.current && addModal) {
      inputRef.current.focus();
    }
  }, [addModal]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={addModal} readOnly />
      <div className="modal">
        <div className="modal-box w-2/12">
          <h3 className="font-bold text-lg">Add Role</h3>
          <p className="py-4">{selected?.name}</p>
          <form onSubmit={addNewRole}>
            <input
              type="text"
              placeholder="Role Name"
              className="input input-bordered w-full max-w-xs"
              ref={inputRef}
              value={roleName}
              onChange={updateNewRole}
            />
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
