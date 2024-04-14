import { BookRoomDTO } from "../dto/BookRoomDTO";

export class BookRoomResponse{
    status: number;
    data: BookRoomDTO[];

    constructor(status: number, data: BookRoomDTO[]){
        this.status = status;
        this.data = data;
    }
}