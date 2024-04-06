import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MotelRoomDTO } from '../models/dto/MotelRoomDTO';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  findAll():Observable<MotelRoomDTO[]>{
    return this.http.get<MotelRoomDTO[]>(INSTANCE + "/api/motel-room-all");
  }

}
