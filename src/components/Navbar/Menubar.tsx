import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(item.path);
  };

  return (
    <li>
      <a onClick={handleNavigate}>{item.name}</a>
    </li>
  );
};

const MultiLevel = ({ item, auth }: { item: Role; auth: AuthType }) => {
  const group = (item.path.match(/\//g) || []).length;
  return (
    <li className={`group-${group}`}>
      <a>
        {item.name}
        <ChevronUpIcon className={`h-4 w-4 [.group-${group}:hover_&]:${item.parent === "" ? `rotate-180` : `rotate-90`} transition-transform`} />
      </a>
      <ul className="bg-base-300 p-2">
        <ul className="menu p-0">
          {item.children.map((child, i) => (
            <MenuItem key={i} item={child} auth={auth} />
          ))}
        </ul>
      </ul>
    </li>
  );
};

const MenuItem = ({ item, auth }: { item: Role; auth: AuthType }) => {
  if (auth.currentUser) {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} auth={auth} />;
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
