import { AccountDTO2 } from "../dto/AccountDTO2";
import { MessageDTO } from "../dto/MessageDTO";

export class MessageAllOfReceiver{
    receiver: AccountDTO2;
    messageList: MessageDTO[];

    constructor(receiver: AccountDTO2, messageList: MessageDTO[]){
        this.receiver = receiver;
        this.messageList = messageList;
    }
}