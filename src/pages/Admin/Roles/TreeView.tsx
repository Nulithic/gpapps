import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Role } from "@/types/AuthType";

interface ItemProps {
  item: Role;
  handleSelected: (role: Role, id: string) => void;
}

const TreeView = ({ item, handleSelected }: ItemProps) => {
  const hasChildren = (item: Role) => {
    if (item === undefined) return false;
    if (item.children.length === 0) return false;
    return true;
  };

  const RoleItem = ({ item, handleSelected }: ItemProps) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} handleSelected={handleSelected} />;
  };

  const SingleLevel = ({ item, handleSelected }: ItemProps) => {
    return (
      <div className={`flex items-center justify-between ${item.parent == "" ? "bg-base-100" : "bg-base-200 ml-5"} p-2 rounded`}>
        <a>{item.name}</a>
        <div className="space-x-1">
          <button className="btn btn-square btn-sm" id="delete" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
            <TrashIcon className="h-4 w-4" />
          </button>
          <button className="btn btn-square btn-sm" id="add" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const MultiLevel = ({ item, handleSelected }: ItemProps) => {
    return (
      <>
        {item.parent !== "" ? (
          <div className="ml-5 space-y-1">
            <div className="flex items-center justify-between bg-base-200 p-2 rounded">
              <a>{item.name}</a>
              <div className="space-x-1">
                <button className="btn btn-square btn-sm" id="delete" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
                  <TrashIcon className="h-4 w-4" />
                </button>
                <button className="btn btn-square btn-sm" id="add" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {item.children.map((child, i) => (
              <RoleItem key={i} item={child} handleSelected={handleSelected} />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between bg-base-100 p-2 rounded">
              <a>{item.name}</a>
              <div className="space-x-1">
                <button className="btn btn-square btn-sm" id="delete" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
                  <TrashIcon className="h-4 w-4" />
                </button>
                <button className="btn btn-square btn-sm" id="add" onClick={(e) => handleSelected(item, e.currentTarget.id)}>
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            {item.children.map((child, i) => (
              <RoleItem key={i} item={child} handleSelected={handleSelected} />
            ))}
          </div>
        )}
      </>
    );
  };

  return <RoleItem item={item} handleSelected={handleSelected} />;
};

export default TreeView;
