import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';
import { HeaderComponent } from '../header/header.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [
    CommonModule,
    UserInfoComponent
  ],
  templateUrl: './header-info.component.html',
  styleUrl: './header-info.component.css'
})
export class HeaderInfoComponent {
  constructor() {

  }

  isLogged(): boolean {
    return localStorage.getItem(IS_LOGGED) === LOGGIN_VALUE.TRUE.toString();
  }

  logout() {
    localStorage.clear();
    localStorage.setItem(IS_LOGGED, LOGGIN_VALUE.FALSE.toString());
  }

  getUserName(): string {
    const userDataString = localStorage.getItem(USER_INFO);
    if (userDataString) {
      const userData: AccountDTO2 = JSON.parse(userDataString);
      return userData.name || "";
    } else {
      console.error("Dữ liệu người dùng không tồn tại trong localStorage");
      return "";
    }
  }
}
