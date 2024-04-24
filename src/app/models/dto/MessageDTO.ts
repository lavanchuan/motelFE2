export class MessageDTO{
    id: number;
    createAt: string;
    message: string;
    status: string;
    senderId: number;
    receiverId: number;

    constructor(id: number, createAt: string, message: string, status: string, senderId: number, receiverId: number){
        this.id = id;
        this.createAt = createAt;
        this.message = message;
        this.status = status;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}