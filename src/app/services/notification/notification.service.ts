import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { MessageDTO } from '../../models/dto/MessageDTO';
import { NotificationDTO } from '../../models/dto/NotificationDTO';
import { BaseCount } from '../../models/response/BaseCount';
import { MessageAllOfSender } from '../../models/response/MessageAllOfSender';
import { MessageDetail } from '../../models/response/MessageDetail';
import { OtherResponse } from '../../models/response/OtherResponse';
import { ApiService } from '../api.service';
import { AuthenService } from '../authen.service';
import { INSTANCE } from '../Instance';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: NotificationDTO[] | any = [];
  private messageAll: MessageAllOfSender | any;

  private notificationReceivedCount: BaseCount | any;
  private messageReceivedCount: BaseCount | any;

  constructor(private http: HttpClient,
    private authService: AuthenService,
    private apiService: ApiService) {

    // alert("USER_ID: " + this.authService.getAccountId());

    //load notification all
    this.loadNotification();

    this.loadMessageAll();

  }

  private loadNotification(): void {
    this.loadNotificationReceivedCount();

    this.loadNotificationAll();
  }

  public loadNotificationReceivedCount(): void {
    this.countNotificationReceived(this.authService.getAccountId())
      .subscribe((res) => {
        this.notificationReceivedCount = res;
      }, (err) => {
        console.error("ERROR: ...");
      });
  }

  public loadMessageReceivedCount(): void {
    this.countMessageReceived(this.authService.getAccountId())
      .subscribe((res) => {
        this.messageReceivedCount = res;
      }, (err) => {
        console.error("ERROR: ...");
      });
  }

  public loadNotificationAll(): void {
    this.findAllNotification(this.authService.getAccountId())
      .subscribe((res) => {
        this.notifications = res;
      }, (err) => {
        console.error("ERROR: ...");
      });

    this.loadNotificationReceivedCount();
  }

  findAllNotification(receiverId: number): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${INSTANCE}/api/notification-all?receiverId=${receiverId}`);
  }

  countNotificationReceived(receiverId: number): Observable<BaseCount> {
    return this.http.get<BaseCount>(`${INSTANCE}/api/notification-count-received?receiverId=${receiverId}`);
  }

  countMessageReceived(receiverId: number): Observable<BaseCount> {
    return this.http.get<BaseCount>(`${INSTANCE}/api/message-count-received?receiverId=${receiverId}`);
  }

  public getNotifications(): NotificationDTO[] {
    return this.notifications;
  }

  public getCountNotificationSent(): number {
    if (!this.notificationReceivedCount) return 0;
    return this.notificationReceivedCount.count;
  }

  public getCountMessageSent(): number { // Số tin nhắn chưa đọc
    if (!this.messageReceivedCount) return 0;
    return this.messageReceivedCount.count;
  }

  readNotification(request: NotificationDTO): Observable<NotificationDTO[]> {
    return this.http.put<NotificationDTO[]>(`${INSTANCE}/api/read-notification`, request);
  }

  readMessage(request: MessageDTO): Observable<OtherResponse<MessageDTO>> {
    return this.http.put<OtherResponse<MessageDTO>>(`${INSTANCE}/api/read-message`, request);
  }

  readNotificationAPI(request: NotificationDTO): void {
    this.readNotification(request).subscribe((res) => {
      this.notifications = res;
    }, (err) => {
      console.error("ERROR: read notification error");
    });
    this.loadNotificationReceivedCount();
  }

  readMessageAPI(request: MessageDTO): void {
    this.readMessage(request).subscribe((res) => {
      if(res.status === 200) {
        console.log("SUCCESS: read message success");
      } else {
        console.error("ERROR: read message error");
      }
    }, (err) => {
      console.error("ERROR: read message error");
    });
    this.loadMessageReceivedCount();
  }

  // MESS

  // public getSenderAll(): AccountDTO2[] {
  //   return [];
  // }

  // public getMessageAllWithSenderId(senderId: number): MessageDTO[] {
  //   return [];
  // }

  // public getCountMessageSent(): number {
  //   return 0;
  // }

  // public getMessageAllSent(): MessageDetail[] {
  //   return [];
  // }

  loadMessageAll(): void {
    console.log("LOADING MESSAGE............................");

    this.loadMessageReceivedCount();

    this.apiService.findMessageAllBySenderId(this.authService.getAccountId())
      .subscribe((res) => {
        this.messageAll = res.data;
        console.log("SUCCESS: load message success");

      }, (error) => {
        console.error("ERROR: load message error");
      });
  }

  public getMessageAll(): MessageAllOfSender {
    return this.messageAll;
  }

  // CONTROL
  isOns = [
    { type: 'MESSAGE', state: false },
    { type: 'NOTIFICATION', state: false }
  ];

  public onType(type: string): void {

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

  public getTypeState(type: string): boolean {
    for (let i = 0; i < this.isOns.length; i++) {
      if (this.isOns[i].type === type) return this.isOns[i].state;
    }

    return false;
  }

  public offMessage(): void {
    for (let i = 0; i < this.isOns.length; i++) {
      if (this.isOns[i].type === "MESSAGE") {
        this.isOns[i].state = false;
        break;
      }
    }
  }

  public offNotification(): void {
    for (let i = 0; i < this.isOns.length; i++) {
      if (this.isOns[i].type === "NOTIFICATION") {
        this.isOns[i].state = false;
        break;
      }
    }
  }
}


function interval(arg0: number) {
  throw new Error('Function not implemented.');
}

