import { AccountDTO2 } from "../dto/AccountDTO2";
import { MessageAllOfReceiver } from "./MessageAllOfReceiver";

export class MessageAllOfSender{
    sender: AccountDTO2;
    messageAllOfReceiverList: MessageAllOfReceiver[];

    constructor(sender: AccountDTO2, messageAllOfReceiverList: MessageAllOfReceiver[]){
        this.sender = sender;
        this.messageAllOfReceiverList = messageAllOfReceiverList;
    }
}