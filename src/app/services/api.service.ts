import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageDTO } from '../models/dto/ImageDTO';
import { MotelRoomDTO } from '../models/dto/MotelRoomDTO';
import { MessageAllOfSender } from '../models/response/MessageAllOfSender';
import { OtherResponse } from '../models/response/OtherResponse';
import { RoomOwnerResponse } from '../models/response/RoomOwnerResponse';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<MotelRoomDTO[]> {
    return this.http.get<MotelRoomDTO[]>(INSTANCE + "/api/motel-room-all");
  }

  findMessageAllBySenderId(senderId: number): Observable<OtherResponse<MessageAllOfSender>> {
    // return this.http.get<OtherResponse<MessageAllOfSender>>(`${INSTANCE}/api/find-message-all-by-sender-id?senderId=${senderId}`);
    return this.http.get<OtherResponse<MessageAllOfSender>>(`${INSTANCE}/api/message-all-by-user-id?userId=${senderId}`);
  }

  findAllImageByRoomId(roomId: number): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>(`${INSTANCE}/api/image-all?roomId=${roomId}`);
  }

  searchRoomByAddressAndPrice(address: string, minPrice: number, maxPrice: number): Observable<RoomOwnerResponse[]> {
    return this.http.get<RoomOwnerResponse[]>
      (`${INSTANCE}/api/search-room-by-address-and-price?address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

}
