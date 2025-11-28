import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Comparar senhas
export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value ? null : { mismatch: true };
};

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  resetForm!: FormGroup;
  token = '';
  loading = false;
  mensagem = '';
  sucesso = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator }); // Aplica o validador no grupo
  }

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token) return;

    this.loading = true;
    this.mensagem = '';
    const { password } = this.resetForm.value;

    this.authService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.loading = false;
        this.sucesso = true;
        this.mensagem = 'Senha redefinida com sucesso! Redirecionando...';
        
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.loading = false;
        this.sucesso = false;
        this.mensagem = 'Token inválido ou expirado. Solicite uma nova recuperação.';
      }
    });
  }
}