import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Necessário para o DatePipe
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

    documentoSelecionadoId: number | null = null;
    showErrorModal = false;
    showDeleteModal = false;

    selecionarDocumento(doc: any) {
        this.documentoSelecionadoId = doc.id;
        console.log("Documento selecionado:", this.documentoSelecionadoId);
    }

    abrirCronograma() {
        this.dialogRef.close();
        this.router.navigate(['/schedule'], {});
    }

    editarProjeto() {
        console.log('Editar projeto:', this.projeto.titulo || this.projeto.name);
    }

    excluirProjeto() {
        this.showDeleteModal = true;
    }

    confirmDelete() {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

        this.http.delete(`${this.apiUrl}/study-project/${this.projeto.id}`, { headers })
            .subscribe({
                next: () => {
                    console.log('Projeto excluído com sucesso.');
                    this.showDeleteModal = false;
                    this.dialogRef.close({ deleted: true });
                },
                error: (err) => {
                    console.error('Erro ao excluir projeto:', err);
                    this.showDeleteModal = false;
                }
            });
    }

    cancelDelete() {
        this.showDeleteModal = false;
    }

    publish(id: number) {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

        this.http.post<any>(`${this.apiUrl}/study-project/${id}/publish`, {}, { headers })
            .subscribe({
                next: (response) => {
                    this.projeto.isPublic = response.isPublic;
                }
            });
    }

    unpublish(id: number) {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

        this.http.post<any>(`${this.apiUrl}/study-project/${id}/unpublish`, {}, {headers})
            .subscribe({
                next: (response) => {
                    this.projeto.isPublic = response.isPublic;
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

        if (!this.documentoSelecionadoId) {
            this.showErrorModal = true;
            return;
        }

        const projectIdToUse = this.projeto.id;

        this.dialogRef.close();

        this.router.navigate(['/quiz'], {
            queryParams: {
                projectId: projectIdToUse,
                fileId: this.documentoSelecionadoId
            }
        });
    }
    closeErrorModal(): void {
        this.showErrorModal = false;
    }

}