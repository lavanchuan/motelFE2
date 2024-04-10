export class AppointRequest{
    meetTime : string;
    motelRoomId : number;
    userId : number;

    constructor(meetTime: string, motelRoomId: number, userId: number){
        this.meetTime = meetTime;
        this.motelRoomId = motelRoomId;
        this.userId = userId;
    }
}