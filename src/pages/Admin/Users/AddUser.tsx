import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface ModalProps {
  addModal: boolean;
  addUser: (username: string, password: string) => void;
  closeAddModal: () => void;
}

const AddRoleModal = ({ addModal, addUser, closeAddModal }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const updateNewUser = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const addNewRole = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newUser.username === "") return toast.error("Username is missing.");
    setNewUser({ username: "", password: "" });
    return addUser(newUser.username, newUser.password);
  };

  const closeModal = () => {
    setNewUser({ username: "", password: "" });
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
          <h3 className="font-bold text-lg pb-4">Add User</h3>
          <form onSubmit={addNewRole}>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
                name="username"
                ref={inputRef}
                value={newUser.username}
                onChange={updateNewUser}
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                name="password"
                value={newUser.password}
                onChange={updateNewUser}
              />
            </div>

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
