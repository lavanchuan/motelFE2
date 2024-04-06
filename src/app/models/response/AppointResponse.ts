import { MakeAppointDTO } from "../dto/MakeAppointDTO";

export class AppointResponse{
    status : number;
    data : MakeAppointDTO;

    constructor(status:number, data:MakeAppointDTO){
        this.status = status;
        this.data = data;
    }
}