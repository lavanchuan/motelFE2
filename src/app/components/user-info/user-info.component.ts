import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { USER_INFO } from '../../services/Instance';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HeaderComponent,
  CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  userInfo : AccountDTO2 | any;

  constructor(){
    let userString = localStorage.getItem(USER_INFO);
    if(userString){
      this.userInfo = JSON.parse(userString);
    } else {
      console.error("ERROR: LOAD USER INFO");
    }
  }
}
