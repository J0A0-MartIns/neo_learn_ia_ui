import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleGetResponse } from '../schedule-get-response';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private apiUrl = 'http://localhost:8080/study-schedule';

    constructor(private http: HttpClient) {}

    getAll(): Observable<ScheduleGetResponse[]> {
        const token = localStorage.getItem('auth_token');

        const headers = new HttpHeaders().set(
            'Authorization', `Bearer ${token}`
        );

        return this.http.get<ScheduleGetResponse[]>(this.apiUrl, { headers });
    }
}
