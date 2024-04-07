import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountDTO } from '../../models/dto/AccountDTO';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(){

  }

  isLogged():boolean {
    return localStorage.getItem(IS_LOGGED) === LOGGIN_VALUE.TRUE.toString();
  }

  logout(){
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
