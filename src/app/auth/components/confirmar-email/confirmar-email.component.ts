import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-confirmar-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.scss']
})
export class ConfirmarEmailComponent implements OnInit {
  loading = true;
  sucesso = false;
  mensagem = 'Aguarde...';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.validarToken();
    } else {
      this.loading = true; 
    }
  }

  validarToken() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.confirmEmail(token).subscribe({
        next: (msg) => {
          this.loading = false;
          this.sucesso = true;
          this.mensagem = msg;
        },
        error: (err) => {
          this.loading = false;
          this.sucesso = false;
          this.mensagem = 'Não foi possível confirmar. O link pode ter expirado ou já foi utilizado.';
        }
      });
    } else {
      this.loading = false;
      this.mensagem = 'Link inválido (Token não encontrado).';
    }
  }
}