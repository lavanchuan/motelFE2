export class BookingAppointRequest {
    motelRoomId: number;
    userId: number;
    meetTime: string;

    constructor(roomId: number, userId: number, meetTime: string) {
        this.motelRoomId = roomId;
        this.userId = userId;
        this.meetTime = meetTime;
    }
}