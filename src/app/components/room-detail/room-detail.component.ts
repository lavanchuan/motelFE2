import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookRoomDTO } from '../../models/dto/BookRoomDTO';
import { BookRoomStatus } from '../../models/enum/BookRoomStatus';
import { AppointRequest } from '../../models/request/AppointRequest';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { RoomService } from '../../services/component/room.service';
import { DialogRequestLoginService } from '../../services/dialog/dialog-request-login.service';
import { ROOM_STATUS } from '../../services/Instance';
import { MessageService } from '../../services/MessageService';
import { RequestLoginComponent } from '../dialog/request-login/request-login.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    MessageComponent,
    FormsModule,
    CommonModule,
    RequestLoginComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {
  [x: string]: any;

  roomDetail: RoomOwnerResponse | any;

  constructor(private roomService: RoomService,
    private requestLoginService: DialogRequestLoginService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.roomDetail = this.roomService.getRoomOwnerCurrent();
  }

  getStatusString(status: ROOM_STATUS): string {
    switch (status) {
      case ROOM_STATUS.OCCUPIED_ROOM: return "Có người ở";
    }
    return "Phòng đang trống";
  }

  getStatusString1(status: string): string {
    switch (status) {
      case "OCCUPIED_ROOM": return "Có người ở";
    }
    return "Phòng đang trống";
  }

  currentImageIndex: number = 0;
  images: string[] = ["assets/p101-1.png", "assets/p102-1.png", "assets/p103-1.png"];

  changeImage(i: number): void {
    this.currentImageIndex += i;
    if (this.currentImageIndex === this.images.length)
      this.currentImageIndex = 0;
    if (this.currentImageIndex === -1)
      this.currentImageIndex = this.images.length - 1;
  }
  isSale(sale: number): boolean {
    return sale == 0;
  }

  isRate(rate: number): boolean {
    return rate == 0;
  }

  formatPrice(price: number): string {
    const integerPart: string = Math.floor(price).toString();
    const formattedPrice: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice;
  }

  // MAKE APPOINT
  formData = {
    meetTime: '',
  };

  openAppointDialog: boolean = false;
  closeAppointmentDialog() {
    this.openAppointDialog = false;
  }

  openDialogRequestLogin(): void {
    this.requestLoginService.setRequestLogin(true);
  }

  openAppointmentDialog() {
    this.openAppointDialog = true;
    console.log(this.openAppointDialog);

  }

  openBookDialog: boolean = false;
  closeBookingDialog() {
    this.openBookDialog = false;
  }

  openBookingDialog() {
    this.openBookDialog = true;
  }

  makeAppoint() {
    const timer = new Date(this.formData.meetTime);
    const meetTime = timer.getDate() + "/" +
      (timer.getMonth() + 1) + "/" +
      timer.getFullYear() + " " +
      timer.getHours() + ":" +
      timer.getMinutes() + ":" +
      timer.getSeconds();

    const userIdString: string | any = localStorage.getItem('USER_ID'); // Lấy giá trị từ localStorage
    const userId = parseInt(userIdString); // Chuyển đổi thành số nguyên

    // TODO
    console.log(this.formData);
    console.log("MeetTime: " + meetTime);
    console.log("UserId: " + userId);


    if (!isNaN(userId)) { // Kiểm tra xem chuyển đổi thành công hay không
      // Sử dụng userId trong yêu cầu đặt lịch hẹn
      this.roomService.bookingAppoint(
        new AppointRequest(meetTime, this.roomDetail.data.room.id, userId))
        .subscribe((response) => {
          // Xử lý khi yêu cầu thành công
          console.log(response);
          this.openAppointDialog = false;
          // this.requestLoginService.setAppointing(true); // set Appointing for show request login
        }, (error) => {
          // Xử lý khi yêu cầu thất bại
          this.closeAppointmentDialog();
          this.openDialogRequestLogin();
          console.error(error);
        });
    } else {
      this.closeAppointmentDialog();
      this.openDialogRequestLogin();
      this.requestLoginService.setAppointing(true);
      console.error('Không thể chuyển đổi USER_ID thành số nguyên');
    }
  }


  // REQUEST LOGIN
  // Control Request Login
  getAppointing(): boolean { return this.requestLoginService.getAppointing(); }
  getIsRequestLogin(): boolean {
    return this.requestLoginService.getIsRequestLogin();
  }

  roomColor: string = '#6C78AF';
  ownerColor: string = '#fff';
  reviewColor: string = '#fff';
  roomBGColor: string = '#fff';
  ownerBGColor: string = '#6C78AF';
  reviewBGColor: string = '#6C78AF';

  defaultColor() {
    this.roomColor = '#fff';
    this.ownerColor = '#fff';
    this.reviewColor = '#fff';
    this.roomBGColor = '#6C78AF';
    this.ownerBGColor = '#6C78AF';
    this.reviewBGColor = '#6C78AF';
  }
  roomDisplay: string = 'block'; // default display for room
  ownerDisplay: string = 'none'; // default display for owner
  reviewDisplay: string = 'none'; // default display for review

  showRoom() {
    this.roomDisplay = 'block';
    this.ownerDisplay = 'none';
    this.reviewDisplay = 'none';
    this.defaultColor();
    this.roomColor = '#6C78AF';
    this.roomBGColor = "#fff"
  }

  showOwner() {
    this.roomDisplay = 'none';
    this.ownerDisplay = 'block';
    this.reviewDisplay = 'none';
    this.defaultColor();
    this.ownerColor = '#6C78AF';
    this.ownerBGColor = "#fff"
  }

  showReview() {
    this.roomDisplay = 'none';
    this.ownerDisplay = 'none';
    this.reviewDisplay = 'block';
    this.defaultColor();
    this.reviewColor = '#6C78AF';
    this.reviewBGColor = "#fff"
  }

  averageRating: number = 4;

  // BOOKING ROOM
  formBookingRoom = {
    startTime: '',
    endTime: '',
  };

  bookingRoom(): void {
    let startTime = new Date(this.formBookingRoom.startTime);
    let startTimeString = startTime.getDate() + "/" +
      startTime.getMonth() + "/" + startTime.getFullYear() + " 00:00:00";
    let endTime = new Date(this.formBookingRoom.endTime);
    let endTimeString = endTime.getDate() + "/" + endTime.getMonth() + "/" + endTime.getFullYear() +
      " 00:00:00";

    let price = this.roomDetail.data.room.price * (100 - this.roomDetail.data.room.sale) / 100;
    let status: BookRoomStatus = BookRoomStatus.PROCESSING;
    let reason = "";
    let motelRoomId = this.roomDetail.data.room.id;
    const userIdString: string | any = localStorage.getItem('USER_ID');
    const userId = parseInt(userIdString);

    if (!isNaN(userId)) {
      this.roomService.bookingRoom(new BookRoomDTO(0, "", startTimeString, endTimeString, price,
        status, reason, motelRoomId, userId)).subscribe((response) => {
          console.log("BOOKING ROOM: " + response);
          if (response.status === 200) {
            console.log("OK");
            alert("Yêu cầu thuê trọ thành công")
          } else {
            console.log("NOT OK");
            alert("Yêu cầu thuê trọ thất bại");
          }
        }, (error) => {
            alert("Yêu cầu thuê trọ thất bại");
        });
    }
  }

  // MESSAGE
  isOnMessage():boolean{
    return this.messageService.getOnMessage();
  }

  onMessage():void{
    this.messageService.onMessage();
  }
}
