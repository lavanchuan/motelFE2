import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDTO } from '../../../models/dto/NotificationDTO';
import { NotificationStatus } from '../../../models/enum/NotificationStatus';
import { MessageAllOfSender } from '../../../models/response/MessageAllOfSender';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  constructor(private router: Router,
    private notificationService: NotificationService){

  }

  getNotifications(): NotificationDTO[] {
    return this.notificationService.getNotifications();
  }

  getMessageAll(): MessageAllOfSender {
    return this.notificationService.getMessageAll();
  }

  NOTIFICATION_TYPE: string[] = ['ALL', 'UNREAD'];
  NOTIFICATION_TYPE_TEXT : string[] = ['Tất cả', 'Chưa đọc'];

  notificationType: string = 'ALL';

  getTypeString(i: number): string {
    return this.NOTIFICATION_TYPE_TEXT[i];
  }

  isSentStatus(status: string) : boolean {
    return status === "SENT";
  }

  navigate(request: NotificationDTO): void {
    this.notificationService.offNotification();
    this.notificationService.readNotificationAPI(request);
    // this.notificationService.loadNotificationReceivedCount();
    this.router.navigate([request.navigate]);
  }

}
