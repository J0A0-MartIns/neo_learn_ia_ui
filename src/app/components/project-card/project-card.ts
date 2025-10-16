import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard {

  conteudoParaExibir: string[] = [];
  contadorOverflow = 0;

  @Input()
  set dadosDoProjeto(data: any) {
    if (!data || !data.conteudo) {
      return;
    }

    this._dadosDoProjeto = data;
    const total = data.conteudo.length;

    if (total <= 4) {
      this.conteudoParaExibir = data.conteudo;
      this.contadorOverflow = 0;
    } else {
      this.conteudoParaExibir = data.conteudo.slice(0, 3);
      this.contadorOverflow = total - 3;
    }
  }

  get dadosDoProjeto(): any {
    return this._dadosDoProjeto;
  }

  private _dadosDoProjeto: any;
}