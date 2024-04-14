import { BookRoomStatus } from "../enum/BookRoomStatus";

export class BookRoomDTO {
    id: number;
    createTime: string;
    startTime: string;
    endTime: string;
    price: number;
    status: BookRoomStatus;
    reason: string;
    motelRoomId: number;
    userId: number;

    constructor(id: number, createTime: string, startTime: string, endTime: string, price: number,
        status: BookRoomStatus, reason: string, motelRoomId: number, userId: number) {

        this.id = id;
        this.createTime = createTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.status = status;
        this.reason = reason;
        this.motelRoomId = motelRoomId;
        this.userId = userId;
    }
}