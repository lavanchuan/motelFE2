export class ChangePasswordRequest{
    userId: number;
    oldPass: string;
    newPass: string;

    constructor(userId: number, oldPass: string, newPass: string){
        this.userId = userId;
        this.oldPass = oldPass;
        this.newPass = newPass;
    }
}