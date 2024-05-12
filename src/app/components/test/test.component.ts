import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { INSTANCE, IS_LOGGED, LOGGIN_VALUE, USER_INFO } from '../../services/Instance';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserInfoComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(private http : HttpClient) {

  }

  isLogged(): boolean {
    return localStorage.getItem(IS_LOGGED) === LOGGIN_VALUE.TRUE.toString();
  }

  logout() {
    localStorage.clear();
    localStorage.setItem(IS_LOGGED, LOGGIN_VALUE.FALSE.toString());
  }

  getUserName(): string {
    const userDataString = localStorage.getItem(USER_INFO);
    if (userDataString) {
      const userData: AccountDTO2 = JSON.parse(userDataString);
      return userData.name || "";
    } else {
      console.error("Dữ liệu người dùng không tồn tại trong localStorage");
      return "";
    }
  }

  //// TEST
  notificSrc = 'assets/icons/notific_';
  notificCount = 200;
  messageCount = 1;

  getCountString(count: number): string {
    return "" + (count > 20 ? "20+" : count);
  }

  //
  isOns = [
    { type: 'MESSAGE', state: false },
    { type: 'NOTIFICATION', state: false }
  ];

  onType(type: string) {

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

  getTypeState(type: string): boolean {
    for (let i = 0; i < this.isOns.length; i++) {
      if (this.isOns[i].type === type) return this.isOns[i].state;
    }

    return false;
  }

  notifics = [
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
    { sender: 1, createAt: '12-12-2024 12:12:12', message: 'HELLO' },
  ];
  messages = [
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
    { sender: 'senderName', status: 'status', message: 'message ------ ------- messsage..', createAt: '12-12-2024 12:12:12' },
  ]


  // TEST UPLOAD IMAGE
  file: File | any;
  uploadImage(){
    let formData = new FormData();

    formData.append('file', this.file[0]);

    this.http.post<any>(`${INSTANCE}/owner/upload-image`, formData).subscribe((res) => {
      // console.log(formData);
    }, (error) => {
      console.error("ERROR");
    });
  }


  
}
