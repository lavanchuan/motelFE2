import { Component } from '@angular/core';
import { MessageService } from '../../services/MessageService';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  constructor(private messageService: MessageService) {

  }

  offMessage():void{
    this.messageService.offMessage();
  }

  isOnMessage():boolean{
    return this.messageService.getOnMessage();
  }

}
