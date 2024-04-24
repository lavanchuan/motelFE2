import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageAllOfReceiver } from '../../models/response/MessageAllOfReceiver';
import { MESSAGE_ALL, MESSAGE_CURRENT, USER_ID } from '../../services/Instance';
import { MessageService } from '../../services/MessageService';
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

  messageCurrent: MessageAllOfReceiver | any;

  messageSend : string | any = '';

  constructor(private messageService: MessageService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    let messageCurrentStr: string | any = sessionStorage.getItem(MESSAGE_CURRENT);
    this.messageCurrent = JSON.parse(messageCurrentStr);

  }

  offMessage(): void {
    this.messageService.offMessage();
  }

  isOnMessage(): boolean {
    return this.messageService.getOnMessage();
  }

  getUserId(): number {
    let userIdStr: string | any = localStorage.getItem(USER_ID);
    return parseInt(userIdStr);
  }


}
