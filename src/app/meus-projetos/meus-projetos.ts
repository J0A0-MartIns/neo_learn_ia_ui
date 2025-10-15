import {Component, OnInit } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-meus-projetos',
    imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './meus-projetos.html',
  styleUrl: './meus-projetos.scss'
})

export class MeusProjetos implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // sem token -> manda pro login
      this.router.navigate(['/login']);
    }
  }
}
