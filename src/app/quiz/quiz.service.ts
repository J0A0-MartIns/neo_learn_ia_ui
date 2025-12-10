import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionContent, QuizQuestion, QuizRequest } from './quiz.model';

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

    generateQuestions(data: QuizRequest): Observable<QuestionContent[]> {
        return this.http.post<QuestionContent[]>(
            `${this.apiUrl}/study-schedule/generate-questions`,
            data,
            { headers: this.getHeaders() }
        );
    }

    generatePdf(payload: {
        fileId: number;
        projectId: number;
        questions: QuestionContent[];
    }) {
        return this.http.post(
            `${this.apiUrl}/study-schedule/generate-pdf`,
            payload,
            { headers: this.getHeaders(), responseType: 'blob' }
        );
    }
}