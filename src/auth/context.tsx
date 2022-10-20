import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "@/services/authService";
import { AuthType, User, Role } from "@/types/AuthType";

const AuthContext = createContext<AuthType>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleCurrentUser = useCallback(async () => {
    try {
      const res = await getUser();
      const user = res.data.user as User;
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) handleCurrentUser();
  }, [handleCurrentUser]);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
