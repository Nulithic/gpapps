import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { User } from "@/types/AuthType";

interface UserProps {
  user: User;
  selected: User | undefined;
  handleSelected: (user: User, id?: string) => void;
}

const UserView = ({ user, selected, handleSelected }: UserProps) => {
  return (
    <div
      className={`flex btn ${selected?.username === user.username ? "btn-primary" : ""} items-center justify-between p-2 rounded`}
      onClick={() => handleSelected(user)}
    >
      <a>{user.username}</a>
      <div className="space-x-1">
        <button className="btn btn-square btn-sm" id="delete" onClick={(e) => handleSelected(user, e.currentTarget.id)}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UserView;
