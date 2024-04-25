import { CommonModule, formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { AccountIdRequest } from '../../models/request/AccountIdRequest';
import { ChangePasswordRequest } from '../../models/request/ChangePasswordRequest';
import { UpdateInfoResponse } from '../../models/response/UpdateInfoResponse';
import { AuthenService } from '../../services/authen.service';
import { USER_ID, USER_INFO } from '../../services/Instance';
import { HeaderInfoComponent } from '../header-info/header-info.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HeaderComponent,
    HeaderInfoComponent,
    CommonModule,
    FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  userInfo: AccountDTO2 | any;

  constructor(private router: Router,
    private authService: AuthenService) {
    let userString = localStorage.getItem(USER_INFO);
    if (userString) {
      this.userInfo = JSON.parse(userString);
    } else {
      console.error("ERROR: LOAD USER INFO");
    }
  }


  // update info
  updateInfo() {
    this.authService.updateInfo(this.userInfo).subscribe((response: UpdateInfoResponse) => {
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem(USER_INFO, JSON.stringify(response.data));
        alert("Cập nhật thông tin thành công");
      } else {
        alert("Cập nhật thông tin thất bại");
      }
    }, (error) => {
      console.error(error);
      alert("Cập nhật thông tin thất bại");
    })
  }

  // change pass
  onChangePass: boolean = false;
  formChangePassword = {
    oldPass: '',
    newPass: '',
    rePass: ''
  }

  changePassword(): void {
    if (this.formChangePassword.oldPass === "" ||
      this.formChangePassword.newPass === "" ||
      this.formChangePassword.rePass === "") {
      alert("Các trường không được để trống");
      return;
    }

    if (this.formChangePassword.newPass !== this.formChangePassword.rePass) {
      alert("Mật khẩu không trùng khớp");
      return;
    }

    let userIdString: string | any = localStorage.getItem(USER_ID);
    let userId = parseInt(userIdString);
    if (isNaN(userId)) {
      console.log("Không chuyển đổit được id của user");
      return;
    }

    this.authService.changePassword(
      new ChangePasswordRequest(userId, this.formChangePassword.oldPass, this.formChangePassword.newPass))
      .subscribe((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Đổi mật khẩu thành công");
          this.onChangePass = false;
        } else {
          alert("Đổi mật khẩu thất bại");
        }
      }, (error) => {
        console.error(error);
        alert("Đổi mật khẩu thất bại");
      })
  }

  // regis owner
  regisOwner(): void {
    let userIdString: string | any = localStorage.getItem(USER_ID);
    let userId = parseInt(userIdString);

    if (isNaN(userId)) {
      console.log("Không thể chuyển đổi id của user");
      return;
    }

    this.authService.registerOwner(new AccountIdRequest(userId)).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem(USER_INFO, JSON.stringify(response.data));
        alert("Đã gửi đăng ký owner đến admin");
      } else {
        alert("Đăng ký owner thất bại");
      }
    }, (error) => {
      alert("Đăng ký owner thất bại");
    });
  }

  // NAVIGATE ADMIN/OWNER
  pageNavigate():void{
    if(this.authService.getRole() === "ADMIN") this.router.navigate(["/admin-home"]);
    else this.router.navigate(["/owner-home"]);
  }

  isUserRole():boolean{
    return this.authService.getRole() === "USER";
  }

  isOwnerRole():boolean{
    return this.authService.getRole() === "OWNER";
  }

  isAdminRole():boolean{
    return this.authService.getRole() === "ADMIN";
  }


  userInfoDisplay: string = 'block';
  userInfoColor: string = '#fff';
  userInfoBGColor: string = '#6C78AF';

  historyAppointDisplay: string = 'none';
  historyAppointColor: string = '#6C78AF';
  historyAppointBGColor: string = '#fff';

  historyBookingDisplay: string = 'none';
  historyBookingColor: string = '#6C78AF';
  historyBookingBGColor: string = '#fff';

  roomInfoDisplay: string = 'none';
  roomInfoColor: string = '#6C78AF';
  roomInfoBGColor: string = '#fff';

  appountRoomDisplay: string = 'none';
  appountRoomColor: string = '#6C78AF';
  appountRoomBGColor: string = '#fff';

  bookingRoomDisplay: string = 'none';
  bookingRoomColor: string = '#6C78AF';
  bookingRoomBGColor: string = '#fff';

  listAdminDisplay: string = 'none';
  listAdminColor: string = '#6C78AF';
  listAdminBGColor: string = '#fff';

  listOwnerDisplay: string = 'none';
  listOwnerColor: string = '#6C78AF';
  listOwnerBGColor: string = '#fff';

  listUserDisplay: string = 'none';
  listUserColor: string = '#6C78AF';
  listUserBGColor: string = '#fff';

  statisticDisplay: string = 'none';
  statisticColor: string = '#6C78AF';
  statisticBGColor: string = '#fff';

  searchDisplay: string = 'none';
  
  defaultColorAndDisplay(){
    this.userInfoDisplay = 'none';
    this.userInfoColor = '#6C78AF';
    this.userInfoBGColor = '#fff';

    this.historyAppointDisplay = 'none';
    this.historyAppointColor = '#6C78AF';
    this.historyAppointBGColor = '#fff';

    this.historyBookingDisplay = 'none';
    this.historyBookingColor = '#6C78AF';
    this.historyBookingBGColor = '#fff';

    this.roomInfoDisplay = 'none';
    this.roomInfoColor = '#6C78AF';
    this.roomInfoBGColor = '#fff';

    this.appountRoomDisplay = 'none';
    this.appountRoomColor = '#6C78AF';
    this.appountRoomBGColor = '#fff';

    this.bookingRoomDisplay = 'none';
    this.bookingRoomColor = '#6C78AF';
    this.bookingRoomBGColor = '#fff';

    this.listAdminDisplay = 'none';
    this.listAdminColor = '#6C78AF';
    this.listAdminBGColor = '#fff';

    this.listOwnerDisplay = 'none';
    this.listOwnerColor = '#6C78AF';
    this.listOwnerBGColor = '#fff';

    this.listUserDisplay = 'none';
    this.listUserColor = '#6C78AF';
    this.listUserBGColor = '#fff';

    this.statisticDisplay = 'none';
    this.statisticColor = '#6C78AF';
    this.statisticBGColor = '#fff';

    this.searchDisplay = 'none';
  }

  showUserInfo(){
    this.defaultColorAndDisplay();
    this.userInfoDisplay = 'block';
    this.userInfoColor = '#fff';
    this.userInfoBGColor = '#6C78AF';
  }

  showHistoryAppoint(){
    this.defaultColorAndDisplay();
    this.historyAppointDisplay = 'block';
    this.historyAppointColor = '#fff';
    this.historyAppointBGColor = '#6C78AF';
  }

  showHistoryBooking(){
    this.defaultColorAndDisplay();
    this.historyBookingDisplay = 'block';
    this.historyBookingColor = '#fff';
    this.historyBookingBGColor = '#6C78AF';
  }

  showRoomInfo(){
    this.defaultColorAndDisplay();
    this.roomInfoDisplay = 'block';
    this.roomInfoColor = '#fff';
    this.roomInfoBGColor = '#6C78AF';
  }

  showAppountRoom(){
    this.defaultColorAndDisplay();
    this.appountRoomDisplay = 'block';
    this.appountRoomColor = '#fff';
    this.appountRoomBGColor = '#6C78AF';
  }

  showBookingRoom(){
    this.defaultColorAndDisplay();
    this.bookingRoomDisplay = 'block';
    this.bookingRoomColor = '#fff';
    this.bookingRoomBGColor = '#6C78AF';
  }

  showListAdmin(){
    this.defaultColorAndDisplay();
    this.searchDisplay = 'block';
    this.listAdminDisplay = 'block';
    this.listAdminColor = '#fff';
    this.listAdminBGColor = '#6C78AF';
  }

  showListOwner(){
    this.defaultColorAndDisplay();
    this.searchDisplay = 'block';
    this.listOwnerDisplay = 'block';
    this.listOwnerColor = '#fff';
    this.listOwnerBGColor = '#6C78AF';
  }

  showListUser(){
    this.defaultColorAndDisplay();
    this.searchDisplay = 'block';
    this.listUserDisplay = 'block';
    this.listUserColor = '#fff';
    this.listUserBGColor = '#6C78AF';
  }

  showStatistic(){
    this.defaultColorAndDisplay();
    this.statisticDisplay = 'block';
    this.statisticColor = '#fff';
    this.statisticBGColor = '#6C78AF';
  }
}
