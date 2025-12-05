import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion, QuizRequest } from './quiz.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('auth_token') || '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        });
    }

    generateQuestions(data: QuizRequest): Observable<QuizQuestion[]> {
        return this.http.post<QuizQuestion[]>(
            `${this.apiUrl}/study-schedule/generate-questions`, 
            data, 
            { headers: this.getHeaders() }
        );
    }
}