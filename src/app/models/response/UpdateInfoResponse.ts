import { AccountDTO2 } from "../dto/AccountDTO2";

export class UpdateInfoResponse{
    status: number;
    data: AccountDTO2;

    constructor(status:number, data:AccountDTO2){
        this.status = status;
        this.data = data;
    }
}