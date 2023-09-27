import { Socket } from "socket.io";
import { messages, writing } from "./messages.controller";

export const connection = (socket: Socket) => {
  socket.on("message", (data) => messages(data, socket));
  socket.on("writing", (data) => writing(data, socket));
};
