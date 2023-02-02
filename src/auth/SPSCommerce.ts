import { useEffect } from "react";
import isBefore from "date-fns/isBefore";

import { setStateCookie } from "@/services/authService";
import { getSPSToken } from "@/auth/storage";
import { getCookie } from "@/auth/cookies";

const AuthSPS = () => {
  useEffect(() => {
    const handleCookie = async () => {
      try {
        await setStateCookie();
      } catch (error) {
        console.log(error);
      }
    };
    handleCookie();
  }, []);

  useEffect(() => {
    const authorize = () => {
      localStorage.setItem("redirectUri", window.location.pathname);

      const audience = "audience=api://api.spscommerce.com/";
      const response_type = "response_type=token";
      // const client_id = "client_id=FLrDHPBYiMS815dB2609EE55ly5vDuzD"; // Sandbox
      const client_id = "client_id=wnMSFrUIEMYZbExnRHTozHeCGXicyfAf"; // Production
      const redirect_uri = "redirect_uri=http://192.168.1.134/redirect";
      const state = `state=${getCookie("state")}`;

      window.location.replace(`https://auth.spscommerce.com/authorize?${audience}&${response_type}&${client_id}&${redirect_uri}&${state}`);
    };

    const spsToken = getSPSToken();
    if (!spsToken || !spsToken.expiresIn) return authorize();

    const checkExpired = isBefore(new Date(spsToken.expiresIn!!), new Date());
    if (checkExpired) return authorize();
  }, []);
};

export default AuthSPS;
