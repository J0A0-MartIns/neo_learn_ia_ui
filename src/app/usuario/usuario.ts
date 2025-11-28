import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, UpdateUserProfile } from '../auth/services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.scss']
})
export class Usuario implements OnInit {

  usuarioForm!: FormGroup;
  mensagemSucesso = '';
  mensagemErro = '';
  loading = false;
  emailOriginal = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cargo: [''],
      instituicao: ['']
    });
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.router.navigate(['/login']);
      } else {
        this.carregarDadosUsuario();
      }
    }
  }

  carregarDadosUsuario(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.emailOriginal = data.userEmail;
        this.usuarioForm.patchValue({
          nome: data.userFirstName,
          email: data.userEmail,
          telefone: data.telefone,
          cargo: data.cargo,
          instituicao: data.instituicao
        });
      },
      error: (err) => {
        console.error('Erro ao buscar dados do usuário', err);
        this.mensagemErro = 'Não foi possível carregar seus dados.';
      }
    });
  }

  salvar(): void {
    if (this.usuarioForm.invalid) {
      this.mensagemErro = "Preencha os campos obrigatórios";
      return;
    }

    this.loading = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    const formData = this.usuarioForm.getRawValue();
    const updateData: UpdateUserProfile = {
      userFirstName: formData.nome,
      telefone: formData.telefone,
      cargo: formData.cargo,
      instituicao: formData.instituicao
    };

    this.authService.updateProfile(updateData).subscribe({
      next: () => {
        if (formData.email !== this.emailOriginal) {
          this.atualizarEmail(formData.email);
        } else {
          this.finalizarSucesso("Dados atualizados com sucesso!");
        }
      },
      error: (err) => {
        this.loading = false;
        this.mensagemErro = 'Erro ao salvar. Tente novamente.';
      }
    });
  }

  atualizarEmail(novoEmail: string) {
    if(!confirm("Atenção: Ao alterar seu e-mail, você será deslogado e precisará confirmar o novo endereço. Deseja continuar?")) {
      this.loading = false;
      return;
    }

    this.authService.updateEmail(novoEmail).subscribe({
      next: () => {
        alert("E-mail atualizado! Um link de confirmação foi enviado para " + novoEmail + ". Faça login novamente após confirmar.");
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.authService.logout();
          }, 2000);
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        if (err.status === 422) {
          this.mensagemErro = "Este e-mail já está em uso.";
        } else {
          this.mensagemErro = "Erro ao atualizar e-mail.";
        }
      }
    });
  }

  solicitarTrocaSenha() {
    if(!this.emailOriginal) return;

    if(confirm(`Deseja receber um e-mail em ${this.emailOriginal} para redefinir sua senha? Você será desconectado por segurança.`)) {
      
      this.authService.forgotPassword(this.emailOriginal).subscribe({
        next: () => {
          this.mensagemSucesso = "E-mail enviado! Desconectando...";
          setTimeout(() => {
            this.authService.logout();
          }, 2000);
        },
        error: () => {
          this.mensagemErro = "Erro ao enviar solicitação.";
        }
      });
    }
  }

  finalizarSucesso(msg: string) {
    this.loading = false;
    this.mensagemSucesso = msg;
    setTimeout(() => this.mensagemSucesso = "", 3000);
  }
}
