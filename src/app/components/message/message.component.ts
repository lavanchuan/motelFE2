import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { MessageDTO } from '../../models/dto/MessageDTO';
import { MessageSendRequest } from '../../models/request/MessageSendRequest';
import { MessageAllOfReceiver } from '../../models/response/MessageAllOfReceiver';
import { MessageAllOfSender } from '../../models/response/MessageAllOfSender';
import { AuthenService } from '../../services/authen.service';
import { MESSAGE_ALL, MESSAGE_CURRENT, USER_ID } from '../../services/Instance';
import { MessageService } from '../../services/MessageService';
import { NotificationService } from '../../services/notification/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {

  // messageAll: MessageAllOfSender | any;
  autoLoadMessageAll: any;

  constructor(private messageService: MessageService,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthenService) {
    // this.getMessageAll();
  }
  ngOnInit(): void {
    // this.autoLoadMessageAll = setInterval(() => {
    //   this.messageAll = this.getMessageAll();
    //   this.messList = this.getMessageListOfReceiver(this.messageAll, this.messList.receiver);
    // }, 1000);
  }

  ngDestroy(): void {
    // clearInterval(this.autoLoadMessageAll());
  }

  getMessageListOfReceiver(messAll: MessageAllOfSender, receiver: AccountDTO2): MessageAllOfReceiver | any {
    for (let i = 0; i < messAll.messageAllOfReceiverList.length; i++) {
      if (messAll.messageAllOfReceiverList[i].receiver.id === receiver.id) return messAll.messageAllOfReceiverList[i];
    }
    return null;
  }

  // isOnMessageNav: boolean = true;
  getIsOnMessageNav(): boolean {
    return this.notificationService.getIsOnMessageNav();
  }

  offMessageNav(): void {
    this.notificationService.offMessageNav();
  }

  onMessageNav(): void {
    this.notificationService.onMessageNav();

  }

  // isOnMessageContent: boolean = false;
  getIsOnMessageContent(): boolean {
    return this.notificationService.getIsOnMessageContent();
  }

  offMessageContent(): void {
    this.notificationService.offMessageContent();
  }

  // messList: MessageAllOfReceiver | any;
  onMessageContent(messList: MessageAllOfReceiver): void {
    this.notificationService.setMessList(messList);
    this.notificationService.onMessageContent();
    this.offMessageNav();
    for (let i = 0; i < this.notificationService.getMessList().messageList.length; i++) {
      if (this.notificationService.getMessList().messageList[i].status === "SANDED" &&
        this.authService.getAccountId() === this.notificationService.getMessList().messageList[i].receiverId) {
        this.notificationService.readMessageAPI(this.notificationService.getMessList().messageList[i]);
      }
    }
  }

  minSizeMessageContent(): void {

  }

  txtMessageSend: string = "";
  sendMessage(): void {
    this.messageService.sendMessage(new MessageSendRequest(this.authService.getAccountId(),
    this.notificationService.getMessList().receiver.id, this.txtMessageSend))
      .subscribe((res) => {
        if (res.status === 200) {
          // console.log("SUCCESS: send message success");
          this.txtMessageSend = "";
        } else console.error("ERROR: send message error");
      }, (err) => {
        console.error("ERROR: send message error");
      });
  }

  getMessageAll(): MessageAllOfSender {
    return this.notificationService.getMessageAll();
  }

  isSent(mess: MessageDTO): boolean {
    return mess.status === "SANDED";
  }

  isReceive(receiverId: number): boolean {
    return receiverId === this.authService.getAccountId();
  }

  getMessList(): MessageAllOfReceiver {return this.notificationService.getMessList();}

}
