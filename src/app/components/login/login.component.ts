import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountDTO } from '../../models/dto/AccountDTO';
import { AccountDTO2 } from '../../models/dto/AccountDTO2';
import { UserInfoDTO } from '../../models/dto/UserInfoDTO';
import { LoginRequest } from '../../models/request/LoginRequest';
import { LoginResponse } from '../../models/response/LoginResponse';
import { MailSenderResponse } from '../../models/response/MailSenderResponse';
import { AuthenService } from '../../services/authen.service';
import { IS_LOGGED, LOGGIN_VALUE, USER_ID, USER_INFO } from '../../services/Instance';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule,
    CommonModule, HeaderComponent, HomeComponent]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authenService: AuthenService) { }

  ngOnInit(): void {
    console.log("INIT");
  }

  appName: string = '';

  mail: string = '';
  password: string = '';
  isCorrect: boolean = true;

  login() {
    this.isValidLogin(this.mail, this.password)
      .subscribe((isValid: boolean) => {
        if (isValid) {
          localStorage.setItem(IS_LOGGED, LOGGIN_VALUE.TRUE.toString());

          if(this.authenService.getRole() === "ADMIN") this.router.navigate(["/admin-home"]);
          else if(this.authenService.getRole() === "OWNER") this.router.navigate(["/owner-home"]);
          else this.router.navigate(["/home"]);
        } else {
          this.isCorrect = isValid;
        }
      })
  }

  isValidLogin(mail: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authenService.login(new LoginRequest(mail, password))
        .subscribe((response: LoginResponse) => {
          console.log(typeof (response));
          if (response.status === 200) {
            console.log(response);
            //
            localStorage.setItem(USER_ID, "" + response.data.id);
            localStorage.setItem(USER_INFO, JSON.stringify(response.data));
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        }, (error) => {
          console.error(error);
          observer.next(false);
          observer.complete();
        });
    });
  }


  register() {
    this.router.navigate(["/register"]);
  }

  forgotPassword(): void {
    if (!this.mail.includes("@")) {
      alert("Bạn cần cung cấp email để nhận mật khẩu");
    } else {
      this.authenService.forgotPassword(this.mail).subscribe((response: MailSenderResponse) => {
        if (response.status === 200) {
          console.log(response);
          alert("Đã gửi mật khẩu đến mail của bạn");
        } else {

          alert("Không hợp lệ");
        }
      }, (error) => {
        alert("Không hợp lệ");
      });
    }
  }


}

