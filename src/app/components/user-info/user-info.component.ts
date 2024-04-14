import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { UpdateInfoResponse } from '../../models/response/UpdateInfoResponse';
import { AuthenService } from '../../services/authen.service';
import { USER_INFO } from '../../services/Instance';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HeaderComponent,
    CommonModule,
    FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  userInfo: AccountDTO2 | any;

  constructor(private authService: AuthenService) {
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

    alert("Hệ thống đang nâng cấp");
    this.onChangePass = false;
    // this.authService.changePassword(this.formChangePassword.oldPass, this.formChangePassword.newPass);
  }
}
