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

  notifics = [
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
  ];
  messages = [
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
  ]

}
