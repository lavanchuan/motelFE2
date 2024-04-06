import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MotelRoomDTO } from '../../models/dto/MotelRoomDTO';
import { AppointRequest } from '../../models/request/AppointRequest';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { ApiService } from '../../services/api.service';
import { RoomService } from '../../services/component/room.service';
import { USER_ID } from '../../services/Instance';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  rooms: RoomOwnerResponse[] = [];

  constructor(private router: Router, private apiService: ApiService, private roomService: RoomService) {
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
  currentRoom: MotelRoomDTO | any;

  makeAppoint() {

    console.log("REASON: " + this.formData.reason);

    const timer = new Date(this.formData.meetTime);
    const meetTime = timer.getDate() + "/" + 
    (timer.getMonth()+1) + "/" + 
    timer.getFullYear() + " " +
    timer.getHours() + ":" +
    timer.getMinutes() + ":" +
    timer.getSeconds();

    const userIdString: string | any = localStorage.getItem('USER_ID'); // Lấy giá trị từ localStorage
    const userId = parseInt(userIdString); // Chuyển đổi thành số nguyên

    if (!isNaN(userId)) { // Kiểm tra xem chuyển đổi thành công hay không
      // Sử dụng userId trong yêu cầu đặt lịch hẹn
      this.roomService.bookingAppoint(new AppointRequest(meetTime, this.formData.reason, this.currentRoom.id, userId))
        .subscribe((response) => {
          // Xử lý khi yêu cầu thành công
          console.log(response);
          this.openAppointDialog = false;
        }, (error) => {
          // Xử lý khi yêu cầu thất bại
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

  roomOwnerCurrentInfo: RoomOwnerResponse|any;
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


  // 
  reload(){
    this.router.navigate(["/home"]);
  }
}
