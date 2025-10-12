import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-meus-projetos',
    imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './meus-projetos.html',
  styleUrl: './meus-projetos.scss'
})
export class MeusProjetos {

}
