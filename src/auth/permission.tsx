import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/context";
const Permission = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const path = window.location.pathname;
  const roles = auth.currentUser?.roles.filter((item) => item.status === true);
  const legalPath = roles?.some((item) => item.path === path);
  if (legalPath === false && !["/", "/home", "/error"].includes(path)) return <Navigate to="/error" replace />;

  return <>{children}</>;
};

export default Permission;
