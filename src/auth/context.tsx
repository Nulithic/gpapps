import { createContext, useContext, useEffect, useCallback, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import socket from "@/libs/socket";
import { setCookie } from "./cookies";
import { getUser } from "@/services/authService";
import { User } from "@/types/AuthType";

interface ActionType {
  type: String;
  payload: User;
}

const initialState = {
  currentUser: {
    username: "",
    lastLogin: "",
    online: false,
    roles: [],
    admin: false,
  },
};

const AuthContext = createContext<{ state: { currentUser: User } }>({ state: initialState });

const UserReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "GET_USER":
      return { currentUser: action.payload };
    default:
      return state;
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const handleCurrentUser = useCallback(async () => {
    try {
      const res = await getUser();
      const user = res.data.user as User;
      const { admin, roles, ...socketUser } = user;
      dispatch({ type: "GET_USER", payload: user });
      socket.emit("user", socketUser);
      // localStorage.setItem("user", JSON.stringify(socketUser));
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) handleCurrentUser();
  }, [handleCurrentUser]);

  if (!localStorage.getItem("token") && window.location.pathname !== "/") return <Navigate to="/" />;
  return <AuthContext.Provider value={{ state }}>{children}</AuthContext.Provider>;
};
