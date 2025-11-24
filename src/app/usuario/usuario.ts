import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, UpdateUserProfile } from '../auth/services/auth.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.scss']
})
export class Usuario implements OnInit {

  usuarioForm!: FormGroup;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      telefone: [''],
      cargo: [''],
      instituicao: ['']
    });
    if (isPlatformBrowser(this.platformId)) {
      this.carregarDadosUsuario();
    }
  }

  carregarDadosUsuario(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
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

    const formData = this.usuarioForm.getRawValue();
    const updateData: UpdateUserProfile = {
      userFirstName: formData.nome,
      telefone: formData.telefone,
      cargo: formData.cargo,
      instituicao: formData.instituicao
    };

    this.authService.updateProfile(updateData).subscribe({
      next: () => {
        this.mensagemErro = "";
        this.mensagemSucesso = "Dados atualizados com sucesso!";
        setTimeout(() => this.mensagemSucesso = "", 3000);
      },
      error: (err) => {
        console.error('Erro ao atualizar dados', err);
        this.mensagemErro = 'Erro ao salvar. Tente novamente.';
      }
    });
  }
}
