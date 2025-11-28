import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class EsqueciSenhaComponent {
  email = '';
  loading = false;
  mensagem = '';
  sucesso = false;

  constructor(private authService: AuthService) {}

  enviarEmail() {
    this.loading = true;
    this.mensagem = '';
    
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.sucesso = true;
        this.mensagem = 'Email enviado! Verifique sua caixa de entrada.';
      },
      error: () => {
        this.loading = false;
        this.sucesso = false;
        this.mensagem = 'Erro ao enviar email. Verifique se o endereço está correto.';
      }
    });
  }
}