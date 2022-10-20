import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Role } from "@/types/AuthType";

interface ItemProps {
  item: Role;
  handleUpdateRole: (role: Role) => void;
}

const TreeView = ({ item, handleUpdateRole }: ItemProps) => {
  const hasChildren = (item: Role) => {
    if (item === undefined) return false;
    if (item.children.length === 0) return false;
    return true;
  };

  const RoleItem = ({ item, handleUpdateRole }: ItemProps) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} handleUpdateRole={handleUpdateRole} />;
  };

  const SingleLevel = ({ item, handleUpdateRole }: ItemProps) => {
    return (
      <div className={`flex items-center justify-between ${item.parent == "" ? "bg-base-100" : "bg-base-200 ml-5"} p-2 rounded`}>
        <a>{item.name}</a>
        <div className="space-x-1">
          <input type="checkbox" className="checkbox" checked={item.status} onChange={() => handleUpdateRole(item)} />
        </div>
      </div>
    );
  };

  const MultiLevel = ({ item, handleUpdateRole }: ItemProps) => {
    return (
      <>
        {item.parent !== "" ? (
          <div className="ml-5 space-y-1">
            <div className="flex items-center justify-between bg-base-200 p-2 rounded">
              <a>{item.name}</a>
              <div className="space-x-1">
                <input type="checkbox" className="checkbox" checked={item.status} onChange={() => handleUpdateRole(item)} />
              </div>
            </div>

            {item.children.map((child, i) => (
              <RoleItem key={i} item={child} handleUpdateRole={handleUpdateRole} />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between bg-base-100 p-2 rounded">
              <a>{item.name}</a>
              <div className="space-x-1">
                <input type="checkbox" className="checkbox" checked={item.status} onChange={() => handleUpdateRole(item)} />
              </div>
            </div>
            {item.children.map((child, i) => (
              <RoleItem key={i} item={child} handleUpdateRole={handleUpdateRole} />
            ))}
          </div>
        )}
      </>
    );
  };

  return <RoleItem item={item} handleUpdateRole={handleUpdateRole} />;
};

export default TreeView;
