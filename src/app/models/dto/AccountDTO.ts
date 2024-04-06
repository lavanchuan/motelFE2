export class AccountDTO {
    id: number;
    mail: string;
    password:string;


    constructor(id:number, mail: string, password:string){
        this.id = id;
        this.mail = mail;
        this.password = password;
    }
}
