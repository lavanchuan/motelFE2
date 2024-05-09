import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountDTO } from '../../models/dto/AccountDTO';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';
import { NotificationService } from '../../services/notification/notification.service';
import { AutoLoadComponent } from '../load/auto-load/auto-load.component';
import { MessageComponent } from '../message/message.component';
import { NotificationComponent } from '../notification/notification/notification.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    UserInfoComponent,
    NotificationComponent,
    MessageComponent,
    AutoLoadComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private notificationService: NotificationService) {

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
  
  getCountString(count: number): string {
    return "" + (count > 20 ? "20+" : count);
  }

  

  getNotificationCount(): number{
    return this.notificationService.getCountNotificationSent();
  }

  getMessageCount(): number {
    return this.notificationService.getCountMessageSent();
  }

  // CONTROL
  onNotification(): void {
    this.notificationService.onType('NOTIFICATION');
  }

  isOnNotification(): boolean {
    return this.notificationService.getTypeState('NOTIFICATION');
  }

  onMessage(): void {
    this.notificationService.onType('MESSAGE');
  }

  isOnMessage(): boolean {
    return this.notificationService.getTypeState('MESSAGE');
  }

}
