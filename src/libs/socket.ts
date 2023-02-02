import { RefObject } from "react";
import { io } from "socket.io-client";
import URL from "@/libs/url";

const TIME_STAMP = new Date();

const socket = io(URL, {
  query: {
    timeStamp: TIME_STAMP.toISOString(),
  },
});

export const socketListen = (id: string, textRef: RefObject<HTMLTextAreaElement>) => {
  socket.on(id, (args) => {
    console.log(args);
    if (textRef && textRef.current) {
      if (args && textRef.current.value !== "") textRef.current.value += `\n`;
      textRef.current.value += `${args}`;
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  });
};

export default socket;
