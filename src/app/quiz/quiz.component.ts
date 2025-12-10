import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { QuestionContent, QuizQuestion, QuizRequest } from './quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class QuizComponent implements OnInit {

  quiz: QuizRequest = { fileId: 0, projectId: 0 };
  questions: QuestionContent[] = [];

  answers: Map<number, string> = new Map();

  currentIndex = 0;
  loading = true;
  finished = false;
  correctAnswers = 0;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const fileId = this.route.snapshot.queryParamMap.get('fileId');
    const projectId = this.route.snapshot.queryParamMap.get('projectId');

    if (fileId && projectId) {
      this.quiz = {
        fileId: Number(fileId),
        projectId: Number(projectId)
      };
      this.loadQuestions();
    } else {
      alert("Parâmetros do projeto inválidos!");
      this.router.navigate(['/']);
    }
  }

  loadQuestions() {
    this.loading = true;
    this.quizService.generateQuestions(this.quiz).subscribe({
      next: (data) => {
        this.questions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('Erro ao gerar questões.');
      }
    });
  }
  selectAnswer(option: string) {
    this.answers.set(this.currentIndex, option);
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

    this.questions.forEach((q, index) => {
      const userAnswer = this.answers.get(index);

      if (userAnswer && userAnswer === q.answer) {
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
    this.correctAnswers = 0;
  }

  backToProject() {
    this.router.navigate(['/meus-projetos']);
  }
  generatePdf() {
    if (!this.questions.length) {
      alert('Nenhuma questão disponível para gerar o PDF.');
      return;
    }

    const payload = {
      fileId: this.quiz.fileId,
      projectId: this.quiz.projectId,
      questions: this.questions
    };

    this.quizService.generatePdf(payload).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('Erro ao gerar PDF.');
      }
    });
  }

}