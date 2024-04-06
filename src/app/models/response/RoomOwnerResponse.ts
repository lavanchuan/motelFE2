import { AccountDTO2 } from "../dto/AccountDTO2";
import { MotelRoomDTO } from "../dto/MotelRoomDTO";
import { RoomOwnerDTO } from "../dto/RoomOwnerDTO";

export class RoomOwnerResponse{
    status: number;
    data: RoomOwnerDTO;

    constructor(status: number, data:RoomOwnerDTO){
        this.status = status;
        this.data = data;
    }
}