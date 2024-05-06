import { NotificationStatus } from "../enum/NotificationStatus";

export class NotificationDTO {
    id: number;
    createAt: string;
    message: string;
    navigate: string;
    status: string;
    senderId: number;
    receiverId: number;

    constructor(id: number, createAt: string, message: string, navigate: string,
        status: string, senderId: number, receiverId: number) {
            this.id = id;
            this.createAt = createAt;
            this.message = message;
            this.navigate = navigate;
            this.status = status;
            this.senderId = senderId;
            this.receiverId = receiverId;
    }
}