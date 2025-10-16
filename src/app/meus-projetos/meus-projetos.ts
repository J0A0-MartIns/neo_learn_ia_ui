import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ProjectDetailsDialogComponent} from "./moda-new-project/project-details-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meus-projetos',
    imports: [CommonModule, RouterModule],
  standalone: true,
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
