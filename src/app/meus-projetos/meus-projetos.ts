import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectList } from '../components/project-list/project-list';

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

}