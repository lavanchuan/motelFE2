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

  userInfoDisplay: string = 'block';
  historyAppointDisplay: string = 'none';
  historyBookingDisplay: string = 'none';
  roomInfoDisplay: string = 'none';
  appountRoomDisplay: string = 'none';
  bookingRoomDisplay: string = 'none';

  userInfoColor: string = '#fff';
  userInfoBGColor: string = '#6C78AF';
  historyAppointColor: string = '#6C78AF';
  historyAppointBGColor: string = '#fff';
  historyBookingColor: string = '#6C78AF';
  historyBookingBGColor: string = '#fff';
  roomInfoColor: string = '#6C78AF';
  roomInfoBGColor: string = '#fff';
  appountRoomColor: string = '#6C78AF';
  appountRoomBGColor: string = '#fff';
  bookingRoomColor: string = '#6C78AF';
  bookingRoomBGColor: string = '#fff';
  
  defaultColorAndDisplay(){
    this.userInfoColor = '#6C78AF';
    this.userInfoBGColor = '#fff';
    this.historyAppointColor = '#6C78AF';
    this.historyAppointBGColor = '#fff';
    this.historyBookingColor = '#6C78AF';
    this.historyBookingBGColor = '#fff';
    this.roomInfoColor = '#6C78AF';
    this.roomInfoBGColor = '#fff';
    this.appountRoomColor = '#6C78AF';
    this.appountRoomBGColor = '#fff';
    this.bookingRoomColor = '#6C78AF';
    this.bookingRoomBGColor = '#fff';
    this.userInfoDisplay = 'none';
    this.historyAppointDisplay = 'none';
    this.historyBookingDisplay = 'none';
    this.roomInfoDisplay = 'none';
    this.appountRoomDisplay = 'none';
    this.bookingRoomDisplay = 'none';
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
}
