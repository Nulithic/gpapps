import { io } from "socket.io-client";

const useSocket = (user: string) => {
  const TIME_STAMP = new Date();

  const socket = io("http://apps.gp:3001", {
    query: {
      user: user,
      timeStamp: TIME_STAMP.toISOString(),
    },
  });

  return socket;
};

export default useSocket;
