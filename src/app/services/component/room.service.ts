import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MotelRoomDTO } from '../../models/dto/MotelRoomDTO';
import { AppointRequest } from '../../models/request/AppointRequest';
import { AppointResponse } from '../../models/response/AppointResponse';
import { RoomOwnerResponse } from '../../models/response/RoomOwnerResponse';
import { INSTANCE } from '../Instance';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomOwnerCurrent : RoomOwnerResponse | any; // data for room-detail

  constructor(private http: HttpClient ) { }

  findById(id : number) : Observable<MotelRoomDTO>{
    return this.http.get<MotelRoomDTO>(INSTANCE + "/api/room-by-id?roomId="+id);
  }

  findAll() : Observable<RoomOwnerResponse[]> {
    return this.http.get<RoomOwnerResponse[]>(INSTANCE + "/api/motel-room-all");
  }

  bookingAppoint(request: AppointRequest) : Observable<AppointResponse>{
    console.log("\n\nbookingAppoint: {" + request.meetTime + ", ");
    console.log(request.reason +", ");
    console.log(request.userId +", ");
    console.log(request.motelRoomId + "}\n\n");
    
    return this.http.post<AppointResponse>(INSTANCE + "/user/booking-appoint", request);
  }

  roomOwnerInfo(roomId: number) : Observable<RoomOwnerResponse>{
    return this.http.get<RoomOwnerResponse>(INSTANCE+"/user/info-room?roomId="+roomId);
  }

  // ROOM DETAIL SERVICE
  setRoomOwnerCurrent(roomOwner : RoomOwnerResponse){
    this.roomOwnerCurrent = roomOwner;
  }
  
  getRoomOwnerCurrent(){
    return this.roomOwnerCurrent;
  }
}
