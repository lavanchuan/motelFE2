import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogRequestLoginService {
  constructor() { }

  private isRequestLogin : boolean = false;

  getIsRequestLogin(){return this.isRequestLogin;}

  setRequestLogin(requestLogin: boolean){
    this.isRequestLogin = requestLogin;
  }
}
