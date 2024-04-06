export class AccountDTO2{
    id: number;
    createAt: string;
    name: string;
    mail: string;
    phone: string;
    address: string;
    sex: string;
    dateOfBirth: string;
    status: string;

    constructor(id:number, createAt:string, name:string, mail:string,
        phone:string, address:string, sex:string, dateOfBirth:string, status:string){
            this.id = id;
            this.createAt = createAt;
            this.name = name;
            this.mail = mail;
            this.phone = phone;
            this.address = address;
            this.sex = sex;
            this.dateOfBirth = dateOfBirth;
            this.status = status;
        }
}