import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomOwnerDTO } from '../models/dto/RoomOwnerDTO';
import { UserInfoDTO } from '../models/dto/UserInfoDTO';
import { ConfirmRequest } from '../models/request/ConfirmRequest';
import { MotelOwnerDetail } from '../models/response/MotelOwnerDetail';
import { OtherResponse } from '../models/response/OtherResponse';
import { RoomOwnerResponse } from '../models/response/RoomOwnerResponse';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserAll(): Observable<UserInfoDTO[]> {
    return this.http.get<UserInfoDTO[]>(`${INSTANCE}/admin/find-all-user`);
  }

  getOwnerAll(): Observable<UserInfoDTO> {
    return this.http.get<UserInfoDTO>(`${INSTANCE}/admin/find-all-owner`);
  }

  getAllAddRoomRequest(): Observable<RoomOwnerResponse[]> {
    return this.http.get<RoomOwnerResponse[]>(`${INSTANCE}/admin/find-all-room-add`);
  }

  confirmRegisOwner(request: ConfirmRequest): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/confirm-regis-owner`, request);
  }

  rejectRegisOwner(request: ConfirmRequest): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/reject-regis-owner`, request);
  }

  confirmAddRoom(request: ConfirmRequest, adminId: number): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/confirm-add-room?adminId=${adminId}`, request);
  }

  rejectAddRoom(request: ConfirmRequest, adminId: number): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/reject-add-room?adminId=${adminId}`, request);
  }

  confirmAddMotel(request: ConfirmRequest): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/confirm-add-motel`, request);
  }

  rejectAddMotel(request: ConfirmRequest): Observable<OtherResponse<string>> {
    return this.http.put<OtherResponse<string>>(`${INSTANCE}/admin/reject-add-motel`, request);
  }

  findAllMotel(): Observable<MotelOwnerDetail[]> {
    return this.http.get<MotelOwnerDetail[]>(`${INSTANCE}/admin/motel-all`);
  }

  findRoomAll(): Observable<RoomOwnerDTO[]> {
    return this.http.get<RoomOwnerDTO[]>(`${INSTANCE}/admin/room-all`);
  }

}
