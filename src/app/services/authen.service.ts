import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDTO } from '../models/dto/AccountDTO';
import { AccountDTO2 } from '../models/dto/AccountDTO2';
import { LoginRequest } from '../models/request/LoginRequest';
import { RegisterRequest } from '../models/request/RegisterRequest';
import { LoginResponse } from '../models/response/LoginResponse';
import { MailSenderResponse } from '../models/response/MailSenderResponse';
import { RegisterResponse } from '../models/response/RegisterResponse';
import { UpdateInfoResponse } from '../models/response/UpdateInfoResponse';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private http : HttpClient) { }

  login(request : LoginRequest){
    return this.http.post<LoginResponse>(INSTANCE + "/authen/login", request);
  }

  register(request : RegisterRequest){
    return this.http.post<RegisterResponse>(INSTANCE + "/authen/register", request);
  }

  // forgot pass
  forgotPassword(mail:string) : Observable<MailSenderResponse>{
    return this.http.get<MailSenderResponse>(`${INSTANCE}/authen/forgot-password?mail=${mail}`);
  }

  // update user info
  updateInfo(request: AccountDTO2) : Observable<UpdateInfoResponse>{
    return this.http.put<UpdateInfoResponse>(`${INSTANCE}/authen/update`, request);
  }

  // change pass
  changePassword(oldPass:string, newPass:string){
    // alert("...");
  }
}
