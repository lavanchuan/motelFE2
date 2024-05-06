import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';
import { NotificationService } from '../../services/notification/notification.service';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { NotificationComponent } from '../notification/notification/notification.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [
    CommonModule,
    UserInfoComponent,
    NotificationComponent,
    MessageComponent
  ],
  templateUrl: './header-info.component.html',
  styleUrl: './header-info.component.css'
})
export class HeaderInfoComponent {
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



  getNotificationCount(): number {
    return this.notificationService.getCountNotificationSent();
  }

  getMessageCount(): number {
    return 1;
  }

  // CONTROL
  onNotification(): void {
    this.notificationService.onType('NOTIFICATION');
  }

  isOnNotification(): boolean {
    return this.notificationService.getTypeState('NOTIFICATION');
  }

  onMessage(): void {
    this.notificationService.onType('MESSAGE')
  }

  isOnMessage(): boolean {
    return this.notificationService.getTypeState('MESSAGE');
  }

}
