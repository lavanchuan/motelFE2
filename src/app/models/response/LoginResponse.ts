import { AccountDTO } from "../dto/AccountDTO";

export class LoginResponse{

    status:number;
    data:AccountDTO;

    constructor(status:number, data:AccountDTO){
        this.status=status;
        this.data=data;
    }

}