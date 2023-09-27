import { Socket } from "socket.io";

export interface IUsers {
    id: number;
    uuid: string;
    socket?: Socket;
    nickname: string;
}

export const users: IUsers[] = [];