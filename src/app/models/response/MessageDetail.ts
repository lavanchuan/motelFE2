import { AccountDTO2 } from "../dto/AccountDTO2";
import { MessageDTO } from "../dto/MessageDTO";

export class MessageDetail {
    sender: AccountDTO2;
    receiver: AccountDTO2;
    messages: MessageDTO[];

    constructor(sender: AccountDTO2, receiver: AccountDTO2, messages: MessageDTO[]) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = messages;
    }
}