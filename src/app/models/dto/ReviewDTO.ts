export class ReviewDTO {
    id: number;
    createAt: string;
    comment: string;
    rate: number;
    status: string;
    bookRoomId: number;

    constructor(id: number, createAt: string, comment: string, rate: number,
        status: string, bookRoomId: number) {
            this.id = id;
            this.createAt = createAt;
            this.comment = comment;
            this.rate = rate;
            this.status = status;
            this.bookRoomId = bookRoomId; 
    }
}
