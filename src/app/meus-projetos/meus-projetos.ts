import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectList } from '../components/project-list/project-list';
import {ProjectDetailsDialogComponent} from "./moda-new-project/project-details-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meus-projetos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProjectList
  ],
  templateUrl: './meus-projetos.html',
  styleUrl: './meus-projetos.scss'
})
export class MeusProjetos {
  constructor(private dialog: MatDialog) {}

  public openModal(){
    this.dialog.open(ProjectDetailsDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
    });
  }
}