import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private onMessageDialog : boolean = false;

  constructor() { }

  public onMessage() : void{
    this.onMessageDialog = true;
  }

  public offMessage(): void{
    this.onMessageDialog = false;
  }

  public getOnMessage():boolean{
    return this.onMessageDialog;
  }
}
