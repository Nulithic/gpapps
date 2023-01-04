import { io } from "socket.io-client";

const TIME_STAMP = new Date();

const socket = io("http://apps.gp:3001", {
  query: {
    timeStamp: TIME_STAMP.toISOString(),
  },
});

export default socket;
