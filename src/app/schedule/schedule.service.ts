import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${this.apiUrl}/study-schedule/${id}`, { headers });
    }



}