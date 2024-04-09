import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointRequest } from '../../models/request/AppointRequest';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { RoomService } from '../../services/component/room.service';
import { DialogRequestLoginService } from '../../services/dialog/dialog-request-login.service';
import { ROOM_STATUS } from '../../services/Instance';
import { RequestLoginComponent } from '../dialog/request-login/request-login.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
    RequestLoginComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  roomDetail: RoomOwnerResponse | any;

  constructor(private roomService: RoomService,
    private requestLoginService: DialogRequestLoginService) {
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

  currentImageIndex: number = 0;
  images: string[] = ["assets/p101-1.png", "assets/p102-1.png", "assets/p103-1.png"];

  changeImage(i:number): void {
    this.currentImageIndex += i;
    if (this.currentImageIndex === this.images.length)
      this.currentImageIndex = 0;
    if (this.currentImageIndex === -1)
      this.currentImageIndex = this.images.length -1;
  }
  isSale(sale: number):boolean {
    return sale == 0;
  }
  // MAKE APPOINT
  formData = {
    meetTime: '',
    reason: '',
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
        new AppointRequest(meetTime, this.formData.reason, this.roomDetail.data.room.id, userId))
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
  getAppointing():boolean{ return this.requestLoginService.getAppointing();}
  getIsRequestLogin(): boolean {
    return this.requestLoginService.getIsRequestLogin();
  }

  roomColor: string = '#6C78AF';
  ownerColor: string = '#fff';
  roomDisplay: string = 'block'; // default display for room
  ownerDisplay: string = 'none'; // default display for owner

  showRoom() {
    this.roomDisplay = 'block';
    this.ownerDisplay = 'none';
    this.roomColor = '#6C78AF';
    this.ownerColor = '#fff';
  }

  showOwner() {
    this.roomDisplay = 'none';
    this.ownerDisplay = 'block';
    this.roomColor = '#fff';
    this.ownerColor = '#6C78AF';
  }
}
