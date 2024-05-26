import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDTO2 } from '../models/dto/AccountDTO2';
import { BookRoomDTO } from '../models/dto/BookRoomDTO';
import { ReviewDTO } from '../models/dto/ReviewDTO';
import { ReviewRequest } from '../models/request/ReviewRequest';
import { AppointDetail } from '../models/response/AppointDetail';
import { BookingDetail } from '../models/response/BookingDetail';
import { HasResponse } from '../models/response/HasResponse';
import { OtherResponse } from '../models/response/OtherResponse';
import { INSTANCE } from './Instance';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  appointAllByUserId(userId: number): Observable<AppointDetail[]> {
    return this.http.get<AppointDetail[]>(`${INSTANCE}/user/appoint-all?userId=${userId}`);
  }

  cancelAppoint(appointId: number): Observable<AppointDetail[]> {
    return this.http.put<AppointDetail[]>(`${INSTANCE}/user/cancel-appoint?appointId=${appointId}`, null);
  }

  bookingAllByUserId(userId: number): Observable<BookingDetail[]> {
    return this.http.get<BookingDetail[]>(`${INSTANCE}/user/booking-all?userId=${userId}`);
  }

  hasBookingRoom(userId: number, roomId: number): Observable<HasResponse> {
    return this.http.get<HasResponse>(`${INSTANCE}/user/has-booking-room?userId=${userId}&roomId=${roomId}`);
  }

  //TODO post review
  postReview(request: ReviewRequest): Observable<OtherResponse<ReviewDTO[]>> {
    return this.http.post<OtherResponse<ReviewDTO[]>>(`${INSTANCE}/user/review-add`, request);
  }

  lastBookingRoom(userId: number, roomId: number): Observable<BookRoomDTO> {
    return this.http.get<BookRoomDTO>(`${INSTANCE}/user/last-booking-room?userId=${userId}&roomId=${roomId}`);
  }
}
