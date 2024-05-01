import { AccountDTO2 } from "../dto/AccountDTO2";
import { BookRoomDTO } from "../dto/BookRoomDTO";
import { MotelDTO } from "../dto/MotelDTO";
import { MotelRoomDTO } from "../dto/MotelRoomDTO";

export class BookingDetail {
    booking: BookRoomDTO;
    user: AccountDTO2;
    owner: AccountDTO2;
    room: MotelRoomDTO;
    motel: MotelDTO;

    constructor(booking: BookRoomDTO, user: AccountDTO2, owner: AccountDTO2, room: MotelRoomDTO, motel: MotelDTO) {
        this.booking = booking;
        this.user = user;
        this.owner = owner;
        this.room = room;
        this.motel = motel;
    }
}