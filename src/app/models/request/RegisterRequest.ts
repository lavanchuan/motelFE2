import { RoleName } from "../enum/RoleName";
import { SexName } from "../enum/SexName";

export class RegisterRequest {
    // ACCOUNT
    name: string;
    mail: string;
    phone: string;
    address: string;
    sex: string;
    dateOfBirth: string;
    role: string;

    // PASSWORD
    pass: string;

    constructor(name: string, mail: string, phone: string, address: string,
        dateOfbirth: string, sex : string, role: string, password: string) {
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.address = address;
        this.sex = sex;
        this.dateOfBirth = dateOfbirth;
        this.role = role;
        this.pass = password;
    }
}