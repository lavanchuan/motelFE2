import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDTO2 } from '../models/dto/AccountDTO2';
import { AppointDetail } from '../models/response/AppointDetail';
import { BookingDetail } from '../models/response/BookingDetail';
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
}
