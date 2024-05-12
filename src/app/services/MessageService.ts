import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDTO } from '../models/dto/MessageDTO';
import { MessageSendRequest } from '../models/request/MessageSendRequest';
import { MessageAllOfReceiver } from '../models/response/MessageAllOfReceiver';
import { MessageAllOfSender } from '../models/response/MessageAllOfSender';
import { OtherResponse } from '../models/response/OtherResponse';
import { ApiService } from './api.service';
import { INSTANCE, MESSAGE_ALL, USER_ID } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private onMessageDialog: boolean = false;

  private messageAll: MessageAllOfSender | any;

  constructor(private apiService: ApiService,
    private http: HttpClient) {
    this.loadMessageAll();
  }

  public onMessage(): void {
    this.onMessageDialog = true;
  }

  public offMessage(): void {
    this.onMessageDialog = false;
  }

  public getOnMessage(): boolean {
    return this.onMessageDialog;
  }

  public loadMessageAll(): void {
    let userIdString: string | any = localStorage.getItem(USER_ID);
    let userId = parseInt(userIdString);
    if (isNaN(userId)) {
      console.error("ERROR:\tKhông thể chuyển đổi id của user sang số nguyên");
      return;
    }
    this.apiService.findMessageAllBySenderId(userId).subscribe((response) => {
      if (response.status === 200) {
        // console.log(`DATA:\t${response}`);
        this.messageAll = response.data;
        localStorage.setItem(MESSAGE_ALL, JSON.stringify(response.data));
      } else {
        console.error("ERROR:\tKhông thể gọi đến api");
      }
    }, (error) => {
      console.error("ERROR:\tLỗi khi get message all");
    });
  }

  public getMessageAll(): MessageAllOfSender {
    return this.messageAll;
  }

  // SEND MESSAGE
  public sendMessage(request: MessageSendRequest): Observable<OtherResponse<MessageDTO>> {
    return this.http.post<OtherResponse<MessageDTO>>(`${INSTANCE}/api/send-message`, request);
  }

  //TODO load message with owner
  loadMessageAllSenderAndReceiver(userId: number, ownerId: number): Observable<MessageAllOfReceiver> {
    return this.http.get<MessageAllOfReceiver>(`${INSTANCE}/api/message-all?senderId=${userId}&receiverId=${ownerId}`);
  }
}

