import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { StudyProject } from '../shared/models/responseFindAllProjects';


export interface ProjectCreateData {
    name: string;
    description?: string;
    file: File[];
}

@Injectable({
    providedIn: 'root'
})
export class MyProjectService {

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    create(request: ProjectCreateData): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const formData = new FormData();

        formData.append('name', request.name);
        if (request.description) {
            formData.append('description', request.description);
        }

        request.file.forEach((file, index) => {
            formData.append('file', file, file.name);
        });

        return this.http.post(`${this.apiUrl}/study-project`, formData, { headers });
    }

    findAllList(): Observable<any> {
        const token = localStorage.getItem('auth_token') || '';
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<StudyProject[]>(`${this.apiUrl}/study-project`, { headers });
    }


}