import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDTO } from '../models/dto/AccountDTO';
import { AccountDTO2 } from '../models/dto/AccountDTO2';
import { UserInfoDTO } from '../models/dto/UserInfoDTO';
import { AccountIdRequest } from '../models/request/AccountIdRequest';
import { ChangePasswordRequest } from '../models/request/ChangePasswordRequest';
import { LoginRequest } from '../models/request/LoginRequest';
import { RegisterRequest } from '../models/request/RegisterRequest';
import { LoginResponse } from '../models/response/LoginResponse';
import { MailSenderResponse } from '../models/response/MailSenderResponse';
import { OtherResponse } from '../models/response/OtherResponse';
import { RegisterResponse } from '../models/response/RegisterResponse';
import { UpdateInfoResponse } from '../models/response/UpdateInfoResponse';
import { INSTANCE, USER_ID, USER_INFO } from './Instance';

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
  changePassword(request: ChangePasswordRequest): Observable<OtherResponse<string>>{
    return this.http.post<OtherResponse<string>>(`${INSTANCE}/authen/change-password`, request);
  }

  // register owner
  registerOwner(request: AccountIdRequest): Observable<OtherResponse<AccountDTO2>>{
    return this.http.post<OtherResponse<AccountDTO2>>(`${INSTANCE}/authen/register-owner`, request);
  }

  // get role
  getRole():string {
    let userInfoStr : string | any = localStorage.getItem(USER_INFO);
    let userInfo : UserInfoDTO = JSON.parse(userInfoStr);
    return userInfo.role;
  }

  // get account id
  getAccountId():number{
    let accountIdStr : string | any = localStorage.getItem(USER_ID);
    let accountId = parseInt(accountIdStr);

    if(isNaN(accountId)) return -1;
    return accountId;
  }
}
