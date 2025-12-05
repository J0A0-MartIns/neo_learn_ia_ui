import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProjectDetailsDialogComponent } from "./moda-new-project/project-details-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ProjectCardComponent } from '../components/project-card/project-card'; 
import { MyProjectService } from './my-project.service';
import { StudyProject } from '../shared/models/responseFindAllProjects';
import { ProjectViewDialog } from './project-view-dialog/project-view-dialog';

@Component({
  selector: 'app-meus-projetos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProjectCardComponent
  ],
  templateUrl: './meus-projetos.html',
  styleUrl: './meus-projetos.scss'
})

export class MeusProjetos implements OnInit {
  projects: StudyProject[] = [];
  constructor(private dialog: MatDialog, private service: MyProjectService, private router: Router) {
    
  }
    ngOnInit(): void {
      this.loadProjects();
      const token = localStorage.getItem('auth_token');
      if (!token) {
          this.router.navigate(['/login']);
      }

    }

  loadProjects() {
    this.service.findMyProjects().subscribe({
      next: (response) => {
        console.log('Dados Carregados: ', response);
        this.projects = response;
      },
      error: (err) => {
        console.error('Erro ao carregados projetos : ', err);
      }
    });
  }

  public openModal() {
    const dialogRef = this.dialog.open(ProjectDetailsDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

public openViewModal(project: StudyProject) {
  this.dialog.open(ProjectViewDialog, {
    width: '950px',
    maxWidth: '95vw',
    data: project
  });
}
}