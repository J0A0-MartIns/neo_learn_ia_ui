import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz, QuizResult } from './quiz.model';
import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
    standalone: true,
    imports: [CommonModule, HttpClientModule]
})
export class QuizComponent implements OnInit {

    quizzes: Quiz[] = [];
    selectedQuiz?: Quiz;

    answers: Map<number, number> = new Map();

    finished = false;
    correctAnswers = 0;

    constructor(private quizService: QuizService) {}

    ngOnInit(): void {
        this.loadQuizzes();
    }

    loadQuizzes() {
        this.quizService.getAll().subscribe({
            next: res => this.quizzes = res,
            error: err => console.error(err)
        });
    }

    openQuiz(id: number) {
        this.quizService.getById(id).subscribe({
            next: quiz => {
                this.selectedQuiz = quiz;
                this.answers.clear();
                this.finished = false;
            },
            error: err => console.error(err)
        });
    }

    selectAnswer(questionId: number, optionId: number) {
        this.answers.set(questionId, optionId);
    }

    finishQuiz() {
        if (!this.selectedQuiz) return;

        let count = 0;

        this.selectedQuiz.questions.forEach(question => {
            const selected = this.answers.get(question.id);
            const option = question.options.find(o => o.id === selected);
            if (option?.correct) count++;
        });

        this.correctAnswers = count;
        this.finished = true;

        const result: QuizResult = {
            quizId: this.selectedQuiz.id,
            totalQuestions: this.selectedQuiz.questions.length,
            correctAnswers: count
        };

        this.quizService.sendResult(result).subscribe();
    }

    retryQuiz() {
        if (!this.selectedQuiz) return;

        // Limpa respostas e marca como não finalizado
        this.answers.clear();
        this.finished = false;

    }

    backToList() {
        this.selectedQuiz = undefined;
        this.finished = false;
    }
}
