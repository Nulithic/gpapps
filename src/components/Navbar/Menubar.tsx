import { NavLink } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { Role, AuthType } from "@/types/AuthType";

const hasChildren = (item: Role) => {
  if (item === undefined) return false;
  if (item.children.length === 0) return false;
  return true;
};

const createRoleList = (roles: Role[]) => {
  const roleList: Role[] = [];
  const list = JSON.parse(JSON.stringify(roles));

  for (const item of list) {
    if (item.parent === "" && item.status) roleList.push(item);
  }

  const addChildren = (roleItem: Role) => {
    for (const item of list) {
      if (roleItem.role === item.parent && item.status) {
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

const SingleLevel = ({ item }: { item: Role }) => {
  return (
    <li>
      <NavLink className="whitespace-nowrap" reloadDocument to={item.path} style={({ isActive }) => (isActive ? {} : undefined)}>
        {item.name}
      </NavLink>
    </li>
  );
};

const MultiLevel = ({ item, auth, index }: { item: Role; auth: AuthType; index: number }) => {
  return (
    <div className={`${index > 0 ? "menu p-2 w-full space-x-2" : "dropdown"}`}>
      {index > 0 ? (
        <div className="flex flex-row justify-between">
          <label className="self-center whitespace-nowrap font-bold">
            <span>{item.name}</span>
          </label>
          <div className="flex flex-row space-x-2">
            <div className="divider divider-horizontal"></div>
            {item.children.map((child, i) => (
              <MenuItem key={i} item={child} auth={auth} index={index + 1} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <label tabIndex={index} className="btn btn-ghost m-1 group/1 space-x-2">
            <span>{item.name}</span>
            <ChevronUpIcon className="group-focus/1:rotate-180 transition-transform h-4 w-4" />
          </label>
          <ul tabIndex={index} className="dropdown-content menu border-solid border-2 border-base-100 rounded-box bg-base-300 p-2 w-fit space-y-2">
            {item.children.map((child, i) => (
              <MenuItem key={i} item={child} auth={auth} index={index + 1} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const MenuItem = ({ item, auth, index }: { item: Role; auth: AuthType; index?: number }) => {
  if (auth.currentUser) {
    if (hasChildren(item)) {
      let sumIndex = index ?? 0;
      return <MultiLevel item={item} auth={auth} index={sumIndex} />;
    } else return <SingleLevel item={item} />;
  } else return null;
};

const Menubar = ({ auth }: { auth: AuthType }) => {
  if (auth.currentUser) {
    const roleList = createRoleList(auth.currentUser.roles);
    return (
      <>
        {roleList.map((item, i) => (
          <MenuItem key={i} item={item} auth={auth} />
        ))}
      </>
    );
  } else return null;
};

export default Menubar;
