import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "@/services/authService";
import { AuthType, User } from "@/types/AuthType";

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
      setCurrentUser(res.data.user);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) handleCurrentUser();
  }, [handleCurrentUser]);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser: handleCurrentUser }}>{children}</AuthContext.Provider>;
};
