export class MakeAppointDTO {
    id: number;
    createAt: string;
    meetTime: string;
    reason: string;
    status: string;
    motelRoomId: number;
    userId: number;

    constructor(id: number, createAt: string, meetTime: string,
        reason: string, status: string, motelRoomId: number, userId: number) {
            this.id = id;
            this.createAt = createAt;
            this.meetTime = meetTime;
            this.reason = reason;
            this.status = status;
            this.motelRoomId = motelRoomId;
            this.userId = userId;
    }
}