import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomOwnerDTO } from '../../../models/dto/RoomOwnerDTO';
import { UserInfoDTO } from '../../../models/dto/UserInfoDTO';
import { ConfirmRequest } from '../../../models/request/ConfirmRequest';
import { RoomOwnerResponse } from '../../../models/response/RoomOwnerResponse';
import { AdminService } from '../../../services/admin.service';
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

  dataShow: UserInfoDTO[] | RoomOwnerResponse[] | any;
  itemList = ['USER', 'OWNER', 'ROOM'];
  itemCurrent = 0;

  constructor(private router: Router,
    private adminService: AdminService) {
    this.loadDataShow(this.itemCurrent);
  }

  loadDataShow(i: number) {
    this.itemCurrent = i;

    switch (this.itemList[i]) {
      case 'USER':
        this.loadUser();
        break;
      case 'OWNER':
        this.loadOwner();
        break;
      case 'ROOM':
        this.loadRoom();
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
}
