import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudyProject {
    id: number;
    name: string;
    description: string;
    fileId: number;
}

@Injectable({
    providedIn: 'root'
})
export class StudyProjectService {

    private apiUrl = 'http://localhost:8080/study-project';

    constructor(private http: HttpClient) {}

    getMyProjects(): Observable<StudyProject[]> {
        const token = localStorage.getItem('auth_token');

        const headers = new HttpHeaders().set(
            'Authorization', `Bearer ${token}`
        );

        return this.http.get<StudyProject[]>(`${this.apiUrl}/my-projects`, { headers });
    }
}

