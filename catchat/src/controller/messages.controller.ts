import { Socket } from "socket.io";

export interface IMessage {
  time: string;
  author: string;
  content: string;
  isAuthor: boolean;
}

export interface IWriting extends Pick<IMessage, "author"> {
  isTyping: boolean;
}

export const messages = (message: IMessage, socket: Socket) => {
  socket.broadcast.emit("message", message);
};

export const writing = (data: IWriting, socket: Socket) => {
  socket.broadcast.emit("writing", data);
};
