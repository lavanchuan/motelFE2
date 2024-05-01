import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountDTO } from '../../models/dto/AccountDTO';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    UserInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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

  // Notification and message
  notificSrc = 'assets/icons/notific_';
  notificCount = 200;
  messageCount = 1;

  getCountString(count: number): string {
    return "" + (count > 20 ? "20+" : count);
  }

  //
  isOns = [
    { type: 'MESSAGE', state: false },
    { type: 'NOTIFICATION', state: false }
  ];

  onType(type: string) {

    if (this.getTypeState(type)) {
      for (let i = 0; i < this.isOns.length; i++) {
        this.isOns[i].state = false;
      }
    }
    else {
      for (let i = 0; i < this.isOns.length; i++) {
        if (this.isOns[i].type !== type) this.isOns[i].state = false;
        else this.isOns[i].state = true;
      }
    }
  }

  getTypeState(type: string): boolean {
    for (let i = 0; i < this.isOns.length; i++) {
      if (this.isOns[i].type === type) return this.isOns[i].state;
    }

    return false;
  }

}
