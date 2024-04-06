export class AppointRequest{
    meetTime : string;
    reason : string;
    motelRoomId : number;
    userId : number;

    constructor(meetTime: string, reason: string, motelRoomId: number, userId: number){
        this.meetTime = meetTime;
        this.reason = reason;
        this.motelRoomId = motelRoomId;
        this.userId = userId;
    }
}