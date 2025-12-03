import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
    imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  userName: string = 'Usuário';
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarNomeUsuario();
    }
  }

  carregarNomeUsuario() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.userName = data.userFirstName;
      },
      error: (err) => {
        console.warn('Não foi possível carregar o nome do usuário');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
