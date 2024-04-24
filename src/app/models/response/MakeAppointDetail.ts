import { MakeAppointDTO } from "../dto/MakeAppointDTO";
import { MotelDTO } from "../dto/MotelDTO";
import { MotelRoomDTO } from "../dto/MotelRoomDTO";

export class MakeAppointDetail{
    makeAppoint: MakeAppointDTO;
    room: MotelRoomDTO;
    motel: MotelDTO;

    constructor(makeAppoint: MakeAppointDTO, room: MotelRoomDTO, motel: MotelDTO){
        this.makeAppoint = makeAppoint;
        this.room = room;
        this.motel = motel;
    }
}