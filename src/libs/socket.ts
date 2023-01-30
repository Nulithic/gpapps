import { io } from "socket.io-client";
import URL from "@/libs/url";

const TIME_STAMP = new Date();

const socket = io(URL, {
  query: {
    timeStamp: TIME_STAMP.toISOString(),
  },
});

export default socket;
