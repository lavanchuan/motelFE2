import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleName } from '../../models/enum/RoleName';
import { SexName } from '../../models/enum/SexName';
import { LoginRequest } from '../../models/request/LoginRequest';
import { RegisterRequest } from '../../models/request/RegisterRequest';
import { RegisterResponse } from '../../models/response/RegisterResponse';
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
  FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router : Router, private authenService : AuthenService){}

  formData = {
    mail: '',
    name: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    sex: '',
    role: '',
    password: ''
  };


  register(): void {
    // Gửi dữ liệu đăng ký đến server hoặc xử lý tùy theo yêu cầu
    if(this.formData.mail === "" || this.formData.password === "") {
      alert("Mail or password is not null");
      return;
    } 
    
    console.log(this.formData);
    

    this.isValidRegister(new RegisterRequest(this.formData.name, 
      this.formData.mail, 
      this.formData.phone,
      this.formData.address, 
      this.formData.dateOfBirth, 
      this.formData.sex, 
      this.formData.role,
      this.formData.password)).subscribe((isValid)=>{
      if(isValid) this.router.navigate(["/login"]);
    });
  }

  isValidRegister(request: RegisterRequest): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authenService.register(request)
        .subscribe((response: RegisterResponse) => {
          console.log(typeof(response));
          if (response.status === 200) {
            console.log(response);
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

  login(): void{
    this.router.navigate(["/login"]);
  }
}
