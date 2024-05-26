import { Injectable } from '@angular/core';
import { BookRoomDTO } from '../../models/dto/BookRoomDTO';
import { UserReviewResponse } from '../../models/response/UserReviewResponse';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewAll : UserReviewResponse[] | any = [];
  private hiddenPostComment: boolean = true;
  private txtComment : string = "";

  private lastBookingRoom: BookRoomDTO | any;

  constructor() { }

  setReviewAll(reviewAll: UserReviewResponse[]) {this.reviewAll = reviewAll;}
  getReviewAll() {return this.reviewAll;}

  setHiddenPostComment(hiddenCommentPost: boolean): void {this.hiddenPostComment = hiddenCommentPost;}
  isHiddenPostComment(): boolean {return this.hiddenPostComment;}

  setComment(comment: string): void {this.txtComment = comment;}
  getComment(): string {return this.txtComment;}

  setLastBookingRoom(booking: BookRoomDTO): void {this.lastBookingRoom = booking;}
  getLastBookingRoom(): BookRoomDTO {return this.lastBookingRoom;}

  getAverageRating(): number {
    let count = this.reviewAll.length;
    if(count === 0) return 0;
    let response = 0;
    for(let i = 0; i < count; i++){
      response += this.reviewAll[i].review.rate / 5;
    }
    return response / count * 5;
  }
}
