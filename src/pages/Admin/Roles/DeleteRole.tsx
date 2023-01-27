import { Role } from "@/types/authType";

interface ModalProps {
  deleteModal: boolean;
  selected: Role | undefined;
  deleteRole: (role: Role) => void;
  closeDeleteModal: () => void;
}

const DeleteRoleModal = ({ deleteModal, selected, deleteRole, closeDeleteModal }: ModalProps) => {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={deleteModal} readOnly />
      <div className="modal">
        <div className="modal-box w-2/12">
          <h3 className="font-bold text-lg">Delete Role</h3>
          <p className="py-4">{selected?.name}</p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={closeDeleteModal}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={() => deleteRole(selected!!)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteRoleModal;
