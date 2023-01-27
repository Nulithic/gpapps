import { User } from "@/types/authType";

interface ModalProps {
  deleteModal: boolean;
  selected: User | undefined;
  deleteUser: (user: User) => void;
  closeDeleteModal: () => void;
}

const DeleteUserModal = ({ deleteModal, selected, deleteUser, closeDeleteModal }: ModalProps) => {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={deleteModal} readOnly />
      <div className="modal">
        <div className="modal-box w-2/12">
          <h3 className="font-bold text-lg">Delete User</h3>
          <p className="py-4">{selected?.username}</p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={closeDeleteModal}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={() => deleteUser(selected!!)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
