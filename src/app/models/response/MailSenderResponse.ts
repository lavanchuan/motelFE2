export class MailSenderResponse{
    status: number;
    data: string;

    constructor(status:number, data:string){
        this.status = status;
        this.data = data;
    }
}