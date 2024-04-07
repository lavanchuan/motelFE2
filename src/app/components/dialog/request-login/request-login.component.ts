import { Component, EventEmitter, Output } from '@angular/core';
import { DialogRequestLoginService } from '../../../services/dialog/dialog-request-login.service';

@Component({
  selector: 'app-request-login',
  standalone: true,
  imports: [],
  templateUrl: './request-login.component.html',
  styleUrl: './request-login.component.css'
})
export class RequestLoginComponent {
  
  constructor(private requestLoginService : DialogRequestLoginService){

  }

  closeDialogRequestLogin():void{
    this.requestLoginService.setRequestLogin(false);
  }
}
