import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { saveSPSToken, getRedirectUri } from "@/auth/storage";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    saveSPSToken();
    const redirectUri = getRedirectUri();
    const from = redirectUri || "/home";
    navigate(from, { replace: true });
  }, []);

  return <>Redirecting...</>;
};

export default Redirect;
