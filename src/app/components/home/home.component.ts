import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MotelRoomDTO } from '../../models/dto/MotelRoomDTO';
import { AppointRequest } from '../../models/request/AppointRequest';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { ApiService } from '../../services/api.service';
import { RoomService } from '../../services/component/room.service';
import { DialogRequestLoginService } from '../../services/dialog/dialog-request-login.service';
import { USER_ID } from '../../services/Instance';
import { RequestLoginComponent } from '../dialog/request-login/request-login.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,
  HeaderComponent,
  FooterComponent,
  RequestLoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  rooms: RoomOwnerResponse[] = [];

  constructor(private router: Router, 
    private apiService: ApiService, 
    private roomService: RoomService,
    private requestLoginService : DialogRequestLoginService) {
    this.getRoomAll();
  }

  getRoom(id: number) {
    let data: any;
    this.roomService.findById(id).subscribe((response) => {
      console.log(response);
      data = response;
    }, (e) => {
      console.error(e);
    });

  }

  getRoomAll(): void {

    this.roomService.findAll().subscribe((response) => {
      console.log(response);
      this.rooms = response;
    }, (e) => {
      console.error(e);
    });
  }

  // APPOINT
  formData = {
    meetTime: '',
    reason: '',
  };
  currentRoom: RoomOwnerResponse | any;

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
        new AppointRequest(meetTime, this.formData.reason, this.currentRoom.data.room.id, userId))
        .subscribe((response) => {
          // Xử lý khi yêu cầu thành công
          console.log(response);
          this.openAppointDialog = false;
        }, (error) => {
          // Xử lý khi yêu cầu thất bại
          this.closeAppointmentDialog();
          this.openDialogRequestLogin();
          console.error(error);
        });
    } else {
      console.error('Không thể chuyển đổi USER_ID thành số nguyên');
    }
  }

  // DIALOG

  openRoomDetailDialog: boolean = false;
  openAppointDialog: boolean = false;
  hasRoomOwner: boolean = false;

  roomOwnerCurrentInfo: RoomOwnerResponse | any;
  openDialog(room: any) {
    this.openRoomDetailDialog = true;

    this.roomOwnerCurrentInfo = room;
  }


  closeDialog() {
    this.openRoomDetailDialog = false;
  }

  openAppointmentDialog(room: any) {
    this.openAppointDialog = true;

    this.currentRoom = room;
  }

  closeAppointmentDialog() {
    this.openAppointDialog = false;

  }

  // Control Request Login
  getIsRequestLogin():boolean{
    return this.requestLoginService.getIsRequestLogin();
  }

  openDialogRequestLogin(): void{
    this.requestLoginService.setRequestLogin(true);
  }

  toRoomDetail(roomDetail : RoomOwnerResponse): void{
    this.roomService.setRoomOwnerCurrent(roomDetail);
    this.router.navigate(["/room-detail"]);
  }

}
