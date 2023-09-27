import { IMessage } from "../controller/messages.controller";

export default class globalChannel {
    private messages: IMessage[] = [];

    push(message: IMessage) {
        this.messages.unshift(message);
    }

    get() {
        return this.messages;
    }
}