import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookRoomDTO } from '../../../models/dto/BookRoomDTO';
import { MakeAppointDTO } from '../../../models/dto/MakeAppointDTO';
import { MotelDTO } from '../../../models/dto/MotelDTO';
import { MotelRoomDTO } from '../../../models/dto/MotelRoomDTO';
import { MotelAddRequest } from '../../../models/request/MotelAddRequest';
import { RoomAddRequest } from '../../../models/request/RoomAddRequest';
import { MakeAppointDetail } from '../../../models/response/MakeAppointDetail';
import { AuthenService } from '../../../services/authen.service';
import { OwnerService } from '../../../services/owner.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  dataShow: MotelDTO[] | MakeAppointDTO[] | BookRoomDTO[] | MotelRoomDTO[] | MakeAppointDetail[] | any;
  itemList = ['Motel', 'Make appoint', 'Book room'];
  itemCurrent = 0;

  motelList: MotelDTO[] | any;

  motelAdd: MotelAddRequest = new MotelAddRequest("", "", "", "", this.authService.getAccountId());

  //
  roomList: MotelRoomDTO[] | any;
  motelIdCurrent: number = 0;
  roomAdd: RoomAddRequest = new RoomAddRequest("", "", 0, 0, "", this.motelIdCurrent);

  // make appoint
  makeAppointList: MakeAppointDetail[] | any;

  constructor(private router: Router,
    private ownerService: OwnerService,
    private authService: AuthenService) {
    this.loadDataShow(this.itemCurrent);
  }

  loadDataShow(i: number) {
    this.itemCurrent = i;

    switch (this.itemList[i]) {

      case 'Motel':
        this.loadMotel();
        break;
      case 'Make appoint':
        this.loadMakeAppoint();
        break;
      default:
        break;
    }

    // alert(this.dataShow[0].id);
  }

  loadMotel(): void {
    let ownerId = this.authService.getAccountId();
    this.ownerService.getMotelAll(ownerId).subscribe((response) => {
      this.dataShow = response;

      this.motelList = this.dataShow;

      console.log("SUCCESS: Load ok");
    }, (error) => {
      console.error("ERROR: Call API error");
    });
  };

  updateMotel(i: number): void {
    this.ownerService.updateMotel(this.motelList[i]).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.dataShow = response.data;
        console.log("SUCCESS: Load ok");
        alert("Cập nhật nhà trọ thành công");
      } else {
        alert("Cập nhật nhà trọ thất bại");
      }
    }, (error) => {
      alert("Cập nhật nhà trọ thất bại");
      console.error("ERROR: call api error");
    })
  }

  addMotel(): void {
    console.log(this.motelAdd);

    this.ownerService.addMotel(this.motelAdd).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.dataShow = response.data;
        console.log("SUCCESS: Load ok");
        alert("Thêm nhà trọ thành công");

        window.location.reload();
      } else {
        alert("Thêm nhà trọ thất bại");
      }
    }, (error) => {
      alert("Thêm nhà trọ thất bại");
      console.error("ERROR: call api error");
    })
  }

  loadRoom(motelId: number): void {
    this.motelIdCurrent = motelId;
    this.ownerService.motelRoomFindAll(motelId).subscribe((response) => {
      console.log(response);
      this.dataShow = response;
      this.roomList = this.dataShow;
      this.itemCurrent = this.itemList.length;
      console.log("Load room success");
    },
      (error) => {
        console.error("ERROR: call api error");
      })
  }

  updateRoom(id: number): void {
    for (let i = 0; i < this.roomList.length; i++) {
      if (this.roomList[i].id === id) {
        console.log(id);

        this.ownerService.updateRoom(this.roomList[i]).subscribe((response) => {
          console.log(response);
          this.dataShow = response;
          this.itemCurrent = this.itemList.length;
          alert("Cập nhật phòng thành công");
          console.log("Update room success");

        }, (error) => {
          console.error("ERROR: call api error");
        });
        break;
      }
    }
  }

  addRoom(): void {
    this.roomAdd.motelId = this.motelIdCurrent;

    this.ownerService.addMotelRoom(this.roomAdd).subscribe((response) => {
      console.log(response);
      this.dataShow = response;
      console.log("Yêu cầu tạo phòng trọ mới thành công");
      alert("Đã gửi yêu cầu tạo phòng mới");
      this.loadRoom(this.authService.getAccountId());
    }, (error) => {
      console.error("ERROR: call api error");
      alert("Tạo phòng không thành công");
    });
  }

  getStatusName(status: string): string {
    switch (status) {
      case "OCCUPIED_ROOM": return "Đã được thuê";
      case "CONFIRMED_CREATE_REQUEST": return "Đang trống";
      case "REJECT_CREATE_REQUEST": return "Từ chối";
      case "PROCESSING_CREATE": return "Đang xử lý";
      default: return "Đang cập nhật";
    }
  }

  //TODO make appoint
  loadMakeAppoint(): void {
    let ownerId = this.authService.getAccountId();
    this.ownerService.findAllMakeAppoint(ownerId).subscribe((response) => {
      this.dataShow = response;
      this.makeAppointList = this.dataShow;
      console.log("Load Make Appoint Success");
    }, (error) => {
      console.error("ERROR: call api error");
    });
  }

  confirmMakeAppoint(makeAppointId: number, isConfirm: boolean): void {
    let request: MakeAppointDTO | any = this.getMakeAppointById(makeAppointId);
    if (isConfirm) {
      this.ownerService.confirmMakeAppoint(request).subscribe((response) => {
        console.log("Confirm make appoint success");
        alert("Xác nhận hẹn xem trọ thành công");
        this.loadMakeAppoint();
      }, (error) => {
        console.error("ERROR: call api error");
      });
    } else {
      this.ownerService.rejectMakeAppoint(request).subscribe((response) => {
        console.log("Reject make appoint success");
        alert("Từ chối hẹn xem trọ thành công");
        this.loadMakeAppoint();
      }, (error) => {
        console.error("ERROR: call api error");
      });
    }
  }

  getMakeAppointById(id: number): MakeAppointDTO | null {
    for (let i = 0; i < this.makeAppointList.length; i++) {
      if (this.makeAppointList[i].makeAppoint.id === id) return this.makeAppointList[i].makeAppoint;
    }
    return null;
  }

  isProcessingCreate(status: string): boolean {
    return status === "PROCESSING_CREATE";
  }

  getMakeAppointStatusName(status: string){
    switch(status){
      case 'PROCESSING_CREATE':
        return "Chờ xác nhận";
      case 'CONFIRMED':
        return "Đã xác nhận";
      case 'REJECTED':
        return "Đã từ chối";
      default: return "Đang cập nhật"; 
    }
  }

  getMotelStatusName(status: string){
    switch(status){
      case 'PROCESSING_CREATE':
        return "Chờ xác nhận";
      case 'ACTIVATING':
      case 'CONFIRMED_CREATE_REQUEST':
        return "Đang hoạt động";
      case 'REJECT_CREATE_REQUEST':
        return "Đã từ chối";
      default: return "Đang cập nhật"; 
    }
  }
}
