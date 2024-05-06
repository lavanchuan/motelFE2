import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-auto-load',
  standalone: true,
  imports: [],
  templateUrl: './auto-load.component.html',
  styleUrl: './auto-load.component.css'
})
export class AutoLoadComponent implements OnInit {

  autoLoadNotificationAll : any;

  constructor(private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.autoLoadNotificationAll = setInterval(() => {
      this.notificationService.loadMessageAll();
      this.notificationService.loadNotificationAll();
    }, 1000);
  }

  ngDestroy(): void {
    clearInterval(this.autoLoadNotificationAll);
  }
}
