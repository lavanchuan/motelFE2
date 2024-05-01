import { AccountDTO2 } from "../dto/AccountDTO2";
import { MotelDTO } from "../dto/MotelDTO";

export class MotelOwnerDetail {

    motel: MotelDTO;
    owner: AccountDTO2;

    constructor(motel: MotelDTO, owner: AccountDTO2) {
        this.motel = motel;
        this.owner = owner;
    }

}