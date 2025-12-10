import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';



export interface ScheduleRequest {
    studyProjectId: string,
    fileId: string,
    weeks: string,
    studyTimePerDay: number,
    title: string

}


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

    generateShedule(data: ScheduleRequest): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/study-schedule/generate-schedule`, data, { headers });
    }

    getAllShedules(): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${this.apiUrl}/study-schedule`, { headers });
    }
    deleleById(id: number): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.delete(`${this.apiUrl}/study-schedule/${id}`, { headers });
    }


}