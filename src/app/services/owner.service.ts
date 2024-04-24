import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MakeAppointDTO } from '../models/dto/MakeAppointDTO';
import { MotelDTO } from '../models/dto/MotelDTO';
import { MotelRoomDTO } from '../models/dto/MotelRoomDTO';
import { ConfirmRequest } from '../models/request/ConfirmRequest';
import { MotelAddRequest } from '../models/request/MotelAddRequest';
import { RoomAddRequest } from '../models/request/RoomAddRequest';
import { MakeAppointDetail } from '../models/response/MakeAppointDetail';
import { OtherResponse } from '../models/response/OtherResponse';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  getMotelAll(ownerId: number): Observable<MotelDTO[]> {
    return this.http.get<MotelDTO[]>(`${INSTANCE}/owner/motel-all?ownerId=${ownerId}`);
  }

  updateMotel(request: MotelDTO): Observable<OtherResponse<MotelDTO[]>> {
    return this.http.put<OtherResponse<MotelDTO[]>>(`${INSTANCE}/owner/motel-update`, request);
  }

  addMotel(request: MotelAddRequest): Observable<OtherResponse<MotelDTO[]>> {
    return this.http.post<OtherResponse<MotelDTO[]>>(`${INSTANCE}/owner/motel-add`, request);
  }

  motelRoomFindAll(motelRoomId: number): Observable<MotelRoomDTO[]> {
    return this.http.get<MotelRoomDTO[]>(`${INSTANCE}/owner/motel-room-all?motelId=${motelRoomId}`);
  }

  updateRoom(request: MotelRoomDTO): Observable<MotelRoomDTO[]> {
    return this.http.put<MotelRoomDTO[]>(`${INSTANCE}/owner/motel-room-update`, request);
  }

  addMotelRoom(request: RoomAddRequest): Observable<MotelRoomDTO[]> {
    return this.http.post<MotelRoomDTO[]>(`${INSTANCE}/owner/motel-room-add`, request);
  }

  findAllMakeAppoint(ownerId: number): Observable<MakeAppointDetail[]> {
    return this.http.get<MakeAppointDetail[]>(`${INSTANCE}/owner/make-appoint-all?ownerId=${ownerId}`);
  }

  confirmMakeAppoint(request: MakeAppointDTO): Observable<MakeAppointDTO[]>{
    return this.http.put<MakeAppointDTO[]>(`${INSTANCE}/owner/make-appoint-confirm`, request);
  }

  rejectMakeAppoint(request: MakeAppointDTO): Observable<MakeAppointDTO[]>{
    return this.http.put<MakeAppointDTO[]>(`${INSTANCE}/owner/make-appoint-reject`, request);
  }
}
