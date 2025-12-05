import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestion, QuizRequest } from './quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class QuizComponent implements OnInit {

  quiz: QuizRequest = { fileId: 0, projectId: 0 };
  questions: QuizQuestion[] = [];
  
  answers: Map<number, string> = new Map(); 
  
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
    const questionId = this.questions[this.currentIndex].id;
    this.answers.set(questionId, option);
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
      const userAnswer = this.answers.get(q.id);
      
      if (userAnswer && userAnswer === q.data.answer) {
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
}