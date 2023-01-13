import { io } from "socket.io-client";

const TIME_STAMP = new Date();

const url = "http://apps.gp:3001";
// const url = "http://localhost:3001";

const socket = io(url, {
  query: {
    timeStamp: TIME_STAMP.toISOString(),
  },
});

export default socket;
