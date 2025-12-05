import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Necessário para o DatePipe
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { QuizService } from '../../quiz/quiz.service';
import { Router } from '@angular/router';
import { QuizRequest } from '../../quiz/quiz.model';

@Component({
  selector: 'app-project-view-dialog',
  standalone: true,
  imports: [
    CommonModule, // Garanta que isso está aqui para formatar as datas
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './project-view-dialog.html',
  styleUrl: './project-view-dialog.scss'
})
export class ProjectViewDialog {
  private apiUrl = 'http://localhost:8080';

  constructor(
      public dialogRef: MatDialogRef<ProjectViewDialog>,
      @Inject(MAT_DIALOG_DATA) public projeto: any,
      private http: HttpClient,
      private quizService: QuizService,
      private router: Router
  ) { console.log("DADOS DO PROJETO RECEBIDOS:", this.projeto); }

  close() {
    this.dialogRef.close();
  }

  abrirCronograma() {
    this.dialogRef.close();
    this.router.navigate(['/schedule'], {});
  }

  editarProjeto() {
    console.log('Editar projeto:', this.projeto.titulo || this.projeto.name);
  }

  excluirProjeto() {
    console.log('Excluir projeto:', this.projeto.titulo || this.projeto.name);
  }

  publish(id: number) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(`${this.apiUrl}/study-project/${id}/publish`, {}, { headers })
        .subscribe({
          next: (response: any) => {
            this.projeto.isPublic = true;
            this.projeto.visibility = 'Público';
          }
        });
  }

  unpublish(id: number) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(`${this.apiUrl}/study-project/${id}/unpublish`, {}, { headers })
        .subscribe({
          next: (response: any) => {
            this.projeto.isPublic = false;
            this.projeto.visibility = 'Privado';
          }
        });
  }

  togglePublic() {
    if (this.projeto.isPublic) {
      this.unpublish(this.projeto.id);
    } else {
      this.publish(this.projeto.id);
    }
  }

  gerarQuestoes() {
    console.log('Gerando questões...');
    this.quizService.generateQuestions(this.projeto.id).subscribe({
      next: (questions: any) => {
        console.log("QUESTÕES RECEBIDAS:", questions);
        localStorage.setItem('quiz_questions', JSON.stringify(questions));
        this.dialogRef.close();
        this.router.navigate(['/quiz'], {
          queryParams: { projectId: this.projeto.id }
        });
      },
      error: err => {
        console.error("Erro ao gerar questões", err);

    if (!this.projeto || !this.projeto.attachments || this.projeto.attachments.length === 0) {
      console.error("Projeto ou anexo inválido");
      return;
    }

    const fileIdToUse = this.projeto.attachments[0].id;
    const projectIdToUse = this.projeto.id;

    this.dialogRef.close();

    this.router.navigate(['/quiz'], {
      queryParams: {
        projectId: projectIdToUse,
        fileId: fileIdToUse
      }
    });
  }
}