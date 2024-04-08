import { Component, OnInit } from '@angular/core';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { RoomService } from '../../services/component/room.service';
import { ROOM_STATUS } from '../../services/Instance';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  roomDetail: RoomOwnerResponse | any;

  constructor(private roomService: RoomService,) {
  }

  ngOnInit(): void {
    this.roomDetail = this.roomService.getRoomOwnerCurrent();
  }

  getStatusString(status : ROOM_STATUS) : string{
    switch(status){
      case ROOM_STATUS.OCCUPIED_ROOM: return "Có người ở";
    }
    return "Phòng đang trống";
  }

  currentImageIndex: number = 0;
  images: string[] = ["assets/p101-1.png", "assets/p102-1.png", "assets/p103-1.png"];

  changeImage(): void {
    if (++this.currentImageIndex === this.images.length)
      this.currentImageIndex = 0;
  }

}
