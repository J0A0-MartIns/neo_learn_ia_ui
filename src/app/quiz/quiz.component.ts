import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestion } from './quiz.model';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
    standalone: true,
    imports: [CommonModule, HttpClientModule]
})
export class QuizComponent implements OnInit {

    projectId!: number;
    questions: QuizQuestion[] = [];
    answers: Map<number, number> = new Map();
    currentIndex = 0;
    loading = true;
    finished = false;
    correctAnswers = 0;

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.projectId = Number(this.route.snapshot.queryParamMap.get('projectId'));

        if (!this.projectId) {
            alert("Nenhum projeto recebido!");
            this.router.navigate(['/']);
            return;
        }

        this.loadQuestions();
    }

    loadQuestions() {
        this.quizService.generateQuestions(this.projectId).subscribe({
            next: (data) => {
                this.questions = data;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    selectAnswer(optionId: number) {
        const questionId = this.questions[this.currentIndex].id;
        this.answers.set(questionId, optionId);
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
        }
    }

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    finishQuiz() {
        let correct = 0;
        this.questions.forEach(q => {
            const chosen = this.answers.get(q.id);
            const correctOpt = q.options.find(o => o.correct);
            if (correctOpt && chosen === correctOpt.id) {
                correct++;
            }
        });
        this.correctAnswers = correct;
        this.finished = true;
    }

    retryQuiz() {
        this.answers.clear();
        this.currentIndex = 0;
        this.finished = false;
    }

    backToProject() {
        this.router.navigate(['/meus-projetos']);
    }
}
