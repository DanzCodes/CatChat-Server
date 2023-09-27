import { Server } from "socket.io";
import { connection } from "../controller/socket.controller";

const socketEvents = (io: Server) => {
  io.on("connection", (socket) => connection(socket));

  /*io.on("disconnect", connection);*/
};

export default socketEvents;
