import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomOwnerResponse } from '../../../models/response/RoomOwnerResponse';
import { UserReviewResponse } from '../../../models/response/UserReviewResponse';
import { ApiService } from '../../../services/api.service';
import { AuthenService } from '../../../services/authen.service';
import { ROOM_OWNER_CURRENT } from '../../../services/Instance';
import { ReviewService } from '../../../services/review/review.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-auto-load-review',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './auto-load-review.component.html',
  styleUrl: './auto-load-review.component.css'
})
export class AutoLoadReviewComponent implements OnInit {

  private load: any;

  constructor(
    private authService: AuthenService,
    private userService: UserService,
    private apiService: ApiService,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {

    let str: string | any = localStorage.getItem(ROOM_OWNER_CURRENT);
    let roomDetail: RoomOwnerResponse = JSON.parse(str);
    let roomId: number = (roomDetail ? roomDetail.data.room.id : 0);

    this.load = setInterval(() => {

      this.apiService.reviewAll(roomId).subscribe((res) => {
        this.reviewService.setReviewAll(res);
      }, (err) => {
        console.error("ERROR");
      })
    }, 1000);

    this.loadHiddenPostComment(roomId);

    this.loadLastBookingRoom(roomId);
  }

  ngDestroy(): void {
    clearInterval(this.load);
  }


  getReviewAll(): UserReviewResponse[] {
    return this.reviewService.getReviewAll();
  }

  loadHiddenPostComment(roomId: number): void {
    this.userService.hasBookingRoom(this.authService.getAccountId(), roomId)
      .subscribe((res) => {
        this.reviewService.setHiddenPostComment(!res.had);
      }, (err) => {
        console.error("ERROR: load hidden post comment error");
      });
  }

  loadLastBookingRoom(roomId: number): void {
    this.userService.lastBookingRoom(this.authService.getAccountId(), roomId)
      .subscribe((res) => {
        if(res) this.reviewService.setLastBookingRoom(res);
      }, (err) => {
        console.error("ERROR: load last booking room error");
      })
  }

}
