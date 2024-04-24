import { Injectable } from '@angular/core';
import { MessageAllOfSender } from '../models/response/MessageAllOfSender';
import { ApiService } from './api.service';
import { MESSAGE_ALL, USER_ID } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private onMessageDialog: boolean = false;

  private messageAll: MessageAllOfSender | any;

  constructor(private apiService: ApiService) {
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
        console.log(`DATA:\t${response}`);
        this.messageAll = response.data;
        localStorage.setItem(MESSAGE_ALL, JSON.stringify(response.data));
      } else {
        console.error("ERROR:\tKhông thể gọi đến api");
      }
    }, (error) => {
      console.error("ERROR:\tLỗi khi get message all");
    });
  }
}
