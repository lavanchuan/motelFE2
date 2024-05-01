import { AccountDTO2 } from "../dto/AccountDTO2";
import { MakeAppointDTO } from "../dto/MakeAppointDTO";
import { MotelDTO } from "../dto/MotelDTO";
import { MotelRoomDTO } from "../dto/MotelRoomDTO";

export class AppointDetail {
    appoint: MakeAppointDTO;
    user: AccountDTO2;
    owner: AccountDTO2;
    room: MotelRoomDTO;
    motel: MotelDTO;

    constructor(appoint: MakeAppointDTO, user: AccountDTO2, owner: AccountDTO2, room: MotelRoomDTO, motel: MotelDTO){
        this.appoint = appoint;
        this.user = user;
        this.owner = owner;
        this.room = room;
        this.motel = motel;
    }
}