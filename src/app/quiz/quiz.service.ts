/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, QuizResult } from './quiz.model';

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

    sendResult(result: QuizResult): Observable<any> {
        return this.http.post(`${this.apiUrl}/quiz/result`, result, {
            headers: this.getHeaders()
        });
    }
}
*/

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz, QuizResult } from './quiz.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor() { }

    private quizzes: Quiz[] = [
        {
            id: 1,
            title: "Introdução a Redes",
            description: "Teste seus conhecimentos básicos em redes de computadores.",
            questions: [
                {
                    id: 101,
                    text: "Qual protocolo é usado para obter um endereço IP automaticamente?",
                    options: [
                        { id: 1, text: "DNS", correct: false },
                        { id: 2, text: "DHCP", correct: true },
                        { id: 3, text: "FTP", correct: false }
                    ]
                },
                {
                    id: 102,
                    text: "Qual camada OSI é responsável pelo roteamento?",
                    options: [
                        { id: 1, text: "Transporte", correct: false },
                        { id: 2, text: "Rede", correct: true },
                        { id: 3, text: "Sessão", correct: false }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Lógica de Programação",
            description: "Questões básicas sobre lógica e algoritmos.",
            questions: [
                {
                    id: 201,
                    text: "Qual estrutura repete um bloco de código enquanto a condição é verdadeira?",
                    options: [
                        { id: 1, text: "if", correct: false },
                        { id: 2, text: "for", correct: false },
                        { id: 3, text: "while", correct: true }
                    ]
                },
                {
                    id: 202,
                    text: "Qual é o resultado de: 3 + 2 * 2 ?",
                    options: [
                        { id: 1, text: "10", correct: false },
                        { id: 2, text: "7", correct: true },
                        { id: 3, text: "8", correct: false }
                    ]
                }
            ]
        }
    ];

    getAll(): Observable<Quiz[]> {
        return of(this.quizzes);
    }

    getById(id: number): Observable<Quiz> {
        const quiz = this.quizzes.find(q => q.id === id)!;
        return of(quiz);
    }

    sendResult(result: QuizResult): Observable<any> {
        console.log("Resultado recebido pelo serviço (simulado):", result);
        return of({ message: "Resultado salvo com sucesso (simulado)" });
    }
}