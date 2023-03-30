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

export const socketListenSaleOrder = (id: string, textRef: RefObject<HTMLTextAreaElement>) => {
  socket.on(id, (args) => {
    console.log(args);
    if (textRef && textRef.current) {
      if (args && textRef.current.value !== "") textRef.current.value += `\n`;
      textRef.current.value += `${args.Order.SaleOrderNumber} | Order created.`;
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  });
};
export const socketListenSaleOrderLine = (id: string, textRef: RefObject<HTMLTextAreaElement>) => {
  socket.on(id, (args) => {
    console.log(args);
    if (textRef && textRef.current) {
      if (args && textRef.current.value !== "") textRef.current.value += `\n`;
      textRef.current.value += `${args.SaleOrderNumber} | Line items added.`;
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  });
};

export const clearRef = (textRef: RefObject<HTMLTextAreaElement>) => {
  if (textRef && textRef.current) {
    textRef.current.value = "";
  }
};

export default socket;
