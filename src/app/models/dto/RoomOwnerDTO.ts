import { AccountDTO2 } from "./AccountDTO2"
import { MotelDTO } from "./MotelDTO";
import { MotelRoomDTO } from "./MotelRoomDTO";

export class RoomOwnerDTO{
    owner:AccountDTO2;
    room:MotelRoomDTO;
    motel:MotelDTO;

    constructor(owner:AccountDTO2, room:MotelRoomDTO, motel:MotelDTO){
        this.owner = owner;
        this.room = room;
        this.motel = motel;
    }
}