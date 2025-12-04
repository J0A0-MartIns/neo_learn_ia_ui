import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { QuizService } from '../../quiz/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],


  templateUrl: './project-view-dialog.html',
  styleUrl: './project-view-dialog.scss'
})
export class ProjectViewDialog {
  private apiUrl = 'http://localhost:8080';


  documentosMock = [
    { name: 'DocumentoEX 1' },
    { name: 'DocumentoEX 2' },
    { name: 'DocumentoEX 3' },
    { name: 'DocumentoEX 4' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ProjectViewDialog>,
    @Inject(MAT_DIALOG_DATA) public projeto: any,
    private http: HttpClient,
    private quizService: QuizService,
    private router: Router
  ) { }

  close() {
    this.dialogRef.close();
  }


  abrirCronograma() {
    this.dialogRef.close();
    this.router.navigate(['/schedule'], {
    });
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

    // Chama o backend enviando o ID do projeto
    this.quizService.generateQuestions(this.projeto.id).subscribe({
      next: (questions: any) => {

        console.log("QUESTÕES RECEBIDAS:", questions);

        // Armazena temporariamente no localStorage ou service compartilhado
        localStorage.setItem('quiz_questions', JSON.stringify(questions));

        // Fecha o dialog
        this.dialogRef.close();

        // Redireciona
        this.router.navigate(['/quiz'], {
          queryParams: { projectId: this.projeto.id }
        });
      },
      error: err => {
        console.error("Erro ao gerar questões", err);
      }
    });
  }


}