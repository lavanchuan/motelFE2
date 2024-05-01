import { AccountDTO2 } from "./AccountDTO2"
import { ImageDTO } from "./ImageDTO";
import { MotelDTO } from "./MotelDTO";
import { MotelRoomDTO } from "./MotelRoomDTO";

export class RoomOwnerDTO {
    owner: AccountDTO2;
    room: MotelRoomDTO;
    motel: MotelDTO;
    images: ImageDTO[];

    constructor(owner: AccountDTO2, room: MotelRoomDTO, motel: MotelDTO, images: ImageDTO[]) {
        this.owner = owner;
        this.room = room;
        this.motel = motel;
        this.images = images;
    }
}