export class MessageSendRequest {
    senderId: number;
    receiverId: number;
    message: string;

    constructor(senderId: number, receiverId: number, message: string) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
    }
}