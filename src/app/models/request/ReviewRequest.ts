export class ReviewRequest {
    rate: number;
    comment: string;
    bookRoomId: number;

    constructor(rate: number, comment: string, bookRoomId: number) {
        this.rate = rate;
        this.comment = comment;
        this.bookRoomId = bookRoomId;
    }
}