import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageDTO } from '../../models/dto/ImageDTO';
import { MotelRoomDTO } from '../../models/dto/MotelRoomDTO';
import { AppointRequest } from '../../models/request/AppointRequest';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { ApiService } from '../../services/api.service';
import { RoomService } from '../../services/component/room.service';
import { DialogRequestLoginService } from '../../services/dialog/dialog-request-login.service';
import { ROOM_IMAGE_DEFAULT, ROOM_OWNER_CURRENT, URL_ROOM_IMAGE, USER_ID } from '../../services/Instance';
import { MessageService } from '../../services/MessageService';
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
    private requestLoginService: DialogRequestLoginService,
    private messageService: MessageService) {
    this.getRoomAll();
    this.messageService.loadMessageAll();
  }


  isSale(sale: number): boolean {
    return sale == 0;
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
        new AppointRequest(meetTime, this.currentRoom.data.room.id, userId))
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
  getIsRequestLogin(): boolean {
    return this.requestLoginService.getIsRequestLogin();
  }

  openDialogRequestLogin(): void {
    this.requestLoginService.setRequestLogin(true);
  }

  toRoomDetail(roomDetail: RoomOwnerResponse): void {
    this.roomService.setRoomOwnerCurrent(roomDetail);
    this.router.navigate(["/room-detail"]);

    //TODO set room info
    localStorage.setItem(ROOM_OWNER_CURRENT, JSON.stringify(this.roomService.getRoomOwnerCurrent()));
  }

  formatPrice(price: number): string {
    const integerPart: string = Math.floor(price).toString();
    const formattedPrice: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice;
  }

  //TODO image
  loadImage(images: ImageDTO[]): string {
    if (!images || images.length === 0) return URL_ROOM_IMAGE + ROOM_IMAGE_DEFAULT + ".png";
    return URL_ROOM_IMAGE + images[0].url + ".png";
  }

  //TODO search and filter room
  addressSearch: string | any = "";
  priceSearch: number = 0;
  searchRoomByAddressAndPrice(): void {
    // alert(`Address[${this.addressSearch}], priceSearch[${this.priceSearch}]`);
    let minPrice = -1;
    let maxPrice = -1;

    switch (this.priceSearch) {
      case 1: maxPrice = 2000000; break;
      case 2: minPrice = 2000000; maxPrice = 4000000; break;
      case 3: minPrice = 4000000; maxPrice = 6000000; break;
      case 4: minPrice = 6000000; break;
    }

    this.apiService.searchRoomByAddressAndPrice(this.addressSearch, minPrice, maxPrice)
      .subscribe((res) => {
        this.rooms = res;
      }, (err) => {
        console.error("ERROR: search room error");

      });
  }

}
