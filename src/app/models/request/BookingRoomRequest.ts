export class BookingRoomRequest {
    motelRoomId: number;
    userId: number;
    startTime: string;
    endTime: string;

    constructor(roomId: number, userId: number, startTime: string, endTime: string) {
        this.motelRoomId = roomId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}