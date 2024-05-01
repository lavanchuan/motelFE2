import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MotelDTO } from '../../../models/dto/MotelDTO';
import { RoomOwnerDTO } from '../../../models/dto/RoomOwnerDTO';
import { UserInfoDTO } from '../../../models/dto/UserInfoDTO';
import { ConfirmRequest } from '../../../models/request/ConfirmRequest';
import { MotelOwnerDetail } from '../../../models/response/MotelOwnerDetail';
import { RoomOwnerResponse } from '../../../models/response/RoomOwnerResponse';
import { AdminService } from '../../../services/admin.service';
import { AuthenService } from '../../../services/authen.service';
import { USER_ID } from '../../../services/Instance';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  dataShow: UserInfoDTO[] | RoomOwnerResponse[] | MotelOwnerDetail[] |
    RoomOwnerDTO[] | any;

  itemList = ['USER', 'OWNER', 'MOTEL', 'ROOM', 'STATISTICS'];
  itemCurrent = 0;

  constructor(private router: Router,
    private adminService: AdminService,
    private authService: AuthenService) {
    this.loadDataShow(this.itemCurrent);
  }

  loadDataShow(i: number) {
    this.itemCurrent = i;
    this.dataShow = [];

    switch (this.itemList[i]) {
      case 'USER':
        this.loadUser();
        break;
      case 'OWNER':
        this.loadOwner();
        break;
      case 'MOTEL':
        this.loadMotelOwner();
        break;
      case 'ROOM':
        // this.loadRoom();
        this.loadRoomDetail();
        break;
      default:
        break;
    }

    // alert(this.dataShow[0].id);
  }

  loadUser(): void {
    this.adminService.getUserAll().subscribe((response) => {
      this.dataShow = response;
      console.log("SUCCESS: Load ok");
    }, (error) => {
      console.error("ERROR: Call API error");
    });
  };

  loadOwner(): void {
    this.adminService.getOwnerAll().subscribe((response) => {
      this.dataShow = response;
      console.log("SUCCESS: Load ok");
    }, (error) => {
      console.error("ERROR: Call API error");
    });
  };

  loadRoom(): void {
    this.adminService.getAllAddRoomRequest().subscribe((response) => {
      this.dataShow = response;
      console.log(response[0].data.room.name);
      console.log("SUCCESS: Load ok");
    }, (error) => {
      console.error("ERROR: Call API error");
    });
  };

  isRegisOwner(status: string): boolean {
    return status === "REGIS_OWNER";
  }

  // CONFIRM REGIS OWNER
  confirmRegisOwner(id: number, isConfirm: boolean): void {
    if (isConfirm) this.adminService.confirmRegisOwner(new ConfirmRequest(id, "")).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("ERROR: call api error");
    });
    else this.adminService.rejectRegisOwner(new ConfirmRequest(id, "")).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("ERROR: call api error");
    });

    window.location.reload();
  }

  // CONFIRM ADD ROOM REQUEST
  confirmAddRoomRequest(id: number, isConfirm: boolean): void {

    if (isConfirm) this.adminService.confirmAddRoom(new ConfirmRequest(id, ""), this.getAdminId()).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("ERROR: call api error");
    });
    else this.adminService.rejectAddRoom(new ConfirmRequest(id, ""), this.getAdminId()).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("ERROR: call api error");
    });

    window.location.reload();
  }

  getAdminId(): number {
    let accountIdStr: string | any = localStorage.getItem(USER_ID);
    let adminId = parseInt(accountIdStr);
    if (isNaN(adminId)) {
      console.error("ERROR: Không thể chuyển đổi id của admin");
      return 0;
    }

    return adminId;
  }

  getUserStatusString(status: string): string {
    switch (status) {
      case 'NORMAL': return "Đang hoạt động";
      case 'REGIS_OWNER': return "Đăng ký chủ trọ";
      case 'CONFIRMED_OWNER_REGIS': return "Đã xác nhận";
      case 'REJECTED_OWNER_REGIS': return "Đã từ chối";
      default: return "Đang cập nhật";
    }
  }

  loadMotelOwner(): void {
    this.adminService.findAllMotel().subscribe((res) => {
      this.dataShow = res;
      console.log("SUCCESS: load motel owner success");
    }, (error) => {
      console.error("ERROR: load motel owner error");
    });
  }

  //TODO MOTEL
  getMotelStatusString(status: string): string {
    switch (status) {
      case "PROCESSING_CREATE": return "Yêu cầu tạo";
      case "ACTIVATING": return "Hoạt động";
      case "CONFIRMED_CREATE_REQUEST": return "Đã xác nhận";
      case "REJECT_CREATE_REQUEST": return "Đã từ chối";
      default: return "Đang cập nhật";
    }
  }

  isProcessingStatus(status: string): boolean {
    return status === "PROCESSING_CREATE";
  }

  confirmMotelCreate(motelId: number, isConfirm: boolean) {
    if (isConfirm) {
      this.adminService.confirmAddMotel(new ConfirmRequest(motelId, "")).subscribe((res) => {
        if (res.status !== 200) {
          alert("Xác nhận thêm nhà trọ thất bại");
          console.error("ERROR: confirm add motel error");
        } else {
          console.log("SUCCESS: confirm add motel success");
          alert("Xác nhận thêm nhà trọ thành công");
        }
      }, (err) => {
        console.error("ERROR: confirm add motel error");
        alert("Xác nhận thêm nhà trọ thất bại");
      });
    } else {
      this.adminService.rejectAddMotel(new ConfirmRequest(motelId, "")).subscribe((res) => {
        if (res.status !== 200) {
          alert("Từ chối thêm nhà trọ thất bại");
          console.error("ERROR: reject add motel error");
        } else {
          console.log("SUCCESS: reject add motel success");
          alert("Từ chối thêm nhà trọ thành công");
        }
      }, (err) => {
        console.error("ERROR: reject add motel error");
        alert("Từ chối thêm nhà trọ thất bại");
      });
    }

    // this.loadDataShow(this.itemList.indexOf('MOTEL'));
    window.location.reload();
  }

  //TODO room
  loadRoomDetail(): void {
    this.adminService.findRoomAll().subscribe((res) => {
      this.dataShow = res;
      console.log("SUCCESS: load room detail success");
    }, (err) => {
      console.error("ERROR: load room detail error");
    });
  }

  getRoomStatusString(status: string): string {
    switch (status) {
      case "PROCESSING_CREATE": return "Yêu cầu tạo";
      case "VACANT_ROOM": return "Trống";
      case "OCCUPIED_ROOM": return "Đang được thuê";
      case "CONFIRMED_CREATE_REQUEST": return "Hoạt động";
      case "REJECT_CREATE_REQUEST": return "Từ chối";
      default: return "Đang cập nhật";
    }
  }

  isRoomCreate(status: string): boolean {
    return status === "PROCESSING_CREATE";
  }

  confirmAddRoom(roomId: number, isConfirm: boolean): void {
    if (isConfirm) {
      this.adminService.confirmAddRoom(new ConfirmRequest(roomId, ""), this.authService.getAccountId())
        .subscribe((res) => {
          if (res.status !== 200) {
            alert("Xác nhận thêm phòng trọ thất bại");
            console.error("ERROR: confirm add room error");
          } else {
            console.log("SUCCESS: confirm add room success");
            alert("Xác nhận thêm phòng trọ thành công");
          }
        }, (err) => {
          console.error("ERROR: confirm add room error");
          alert("Xác nhận thêm phòng trọ thất bại");
        });
    } else {
      this.adminService.rejectAddRoom(new ConfirmRequest(roomId, ""), this.authService.getAccountId())
        .subscribe((res) => {
          if (res.status !== 200) {
            alert("Từ chối thêm phòng trọ thất bại");
            console.error("ERROR: reject add room error");
          } else {
            console.log("SUCCESS: reject add room success");
            alert("Từ chối thêm phòng trọ thành công");
          }
        }, (err) => {
          console.error("ERROR: reject add room error");
          alert("Từ chối thêm phòng trọ thất bại");
        });
    }

    // this.loadDataShow(this.itemList.indexOf('MOTEL'));
    window.location.reload();
  }
}
