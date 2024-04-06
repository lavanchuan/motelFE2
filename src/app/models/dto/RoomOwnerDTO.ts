import { AccountDTO2 } from "./AccountDTO2"
import { MotelRoomDTO } from "./MotelRoomDTO";

export class RoomOwnerDTO{
    owner:AccountDTO2;
    room:MotelRoomDTO;

    constructor(owner:AccountDTO2, room:MotelRoomDTO){
        this.owner = owner;
        this.room = room;
    }
}