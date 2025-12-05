import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Quiz, QuizQuestion } from './quiz.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('auth_token') || '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    generateQuestions(projectId: number): Observable<QuizQuestion[]> {

        const mockQuestions: Quiz[] = [
            {
                id: 1,
                pergunta: "O que é Inteligência Artificial?",
                alternativas: [
                    "Área da computação que simula a inteligência humana",
                    "Um tipo de hardware avançado",
                    "Um sistema operacional moderno",
                    "Uma linguagem de programação"
                ],
                correta: 0
            },
            {
                id: 2,
                pergunta: "Qual é o objetivo de Machine Learning?",
                alternativas: [
                    "Criar sites automaticamente",
                    "Permitir que sistemas aprendam com dados",
                    "Aumentar a eficiência da GPU",
                    "Executar comandos remotos"
                ],
                correta: 1
            },
            {
                id: 3,
                pergunta: "Redes neurais artificiais são inspiradas em:",
                alternativas: [
                    "Rede elétrica",
                    "Sistema digestivo",
                    "Cérebro humano",
                    "Sistema imunológico"
                ],
                correta: 2
            }
        ];

        const questions: QuizQuestion[] = mockQuestions.map(q => ({
            id: q.id,
            text: q.pergunta,
            options: q.alternativas.map((alt, index) => ({
                id: index,
                text: alt,
                correct: index === q.correta
            }))
        }));

        return of(questions).pipe(delay(1500));

        // Quando o backend estiver pronto:
        /*
        return this.http.get<Quiz[]>(`${this.apiUrl}/quiz/generate?projectId=${projectId}`, {
            headers: this.getHeaders()
        }).pipe(
            map(data => data.map(q => ({
                id: q.id,
                text: q.pergunta,
                options: q.alternativas.map((alt, index) => ({
                    id: index,
                    text: alt,
                    correct: index === q.correta
                }))
            })))
        );
        */
    }

    getAll(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(`${this.apiUrl}/quiz`, {
            headers: this.getHeaders()
        });
    }

    getById(id: number): Observable<Quiz> {
        return this.http.get<Quiz>(`${this.apiUrl}/quiz/${id}`, {
            headers: this.getHeaders()
        });
    }

    sendResult(result: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/quiz/result`, result, {
            headers: this.getHeaders()
        });
    }
}
