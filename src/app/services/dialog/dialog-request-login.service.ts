import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogRequestLoginService {
  constructor() { }

  private isRequestLogin : boolean = false;
  private isAppointing : boolean = false;

  getIsRequestLogin(){return this.isRequestLogin;}

  setRequestLogin(requestLogin: boolean){
    this.isRequestLogin = requestLogin;
    if(!requestLogin) this.setAppointing(false);
  }

  getAppointing(){return this.isAppointing;}

  setAppointing(appointing: boolean){this.isAppointing = appointing;}
}
