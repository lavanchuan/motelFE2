import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountDTO } from '../../models/dto/AccountDTO';
import { LoginRequest } from '../../models/request/LoginRequest';
import { LoginResponse } from '../../models/response/LoginResponse';
import { AuthenService } from '../../services/authen.service';
import { IS_LOGGED, LOGGIN_VALUE, USER_ID } from '../../services/Instance';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
    .subscribe((isValid:boolean)=>{
      if(isValid) {
        localStorage.setItem(IS_LOGGED, LOGGIN_VALUE.TRUE.toString());
        this.router.navigate(["/home"]);
      } else {
        this.isCorrect = isValid;
      }
    })
  }

  isValidLogin(mail: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authenService.login(new LoginRequest(mail, password))
        .subscribe((response: LoginResponse) => {
          console.log(typeof(response));
          if (response.status === 200) {
            console.log(response);
            //
            localStorage.setItem(USER_ID, ""+response.data.id);
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


}

