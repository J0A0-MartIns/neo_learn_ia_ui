import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-project-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
      HttpClientModule
  ],

  // Caminhos corrigidos conforme sua estrutura
  templateUrl: './project-view-dialog.html',
  styleUrl: './project-view-dialog.scss'
})
export class ProjectViewDialog {
    private apiUrl = 'http://localhost:8080';

  // Mock de documentos caso o projeto não tenha, para layout
  documentosMock = [
    { name: 'DocumentoEX 1' },
    { name: 'DocumentoEX 2' },
    { name: 'DocumentoEX 3' },
    { name: 'DocumentoEX 4' }
  ];

  constructor(
      public dialogRef: MatDialogRef<ProjectViewDialog>,
      @Inject(MAT_DIALOG_DATA) public projeto: any,
      private http: HttpClient
  ) {}

  close() {
    this.dialogRef.close();
  }

  // Métodos placeholders para os botões
  abrirCronograma() {
    console.log('Abrir cronograma de:', this.projeto.titulo || this.projeto.name);
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
}