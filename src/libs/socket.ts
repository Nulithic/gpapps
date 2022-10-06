import { io } from "socket.io-client";
import { useAuth } from "@/auth/context";

const useSocket = () => {
  const auth = useAuth();
  const USER = auth.currentUser;

  const TIME_STAMP = new Date();

  const socket = io("http://apps.gp:3001", {
    query: {
      user: USER,
      timeStamp: TIME_STAMP.toISOString(),
    },
  });

  return socket;
};

export default useSocket;
