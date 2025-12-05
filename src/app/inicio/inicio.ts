import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    templateUrl: './inicio.html',
    styleUrl: './inicio.scss'
})
export class Inicio implements OnInit {

    public userName: string = 'Usuário';

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            this.router.navigate(['/login']);
            return;
        }

        this.carregarNomeUsuario();
    }

    goToCronograma(): void {
        this.router.navigate(['/schedule']);
    }

    carregarNomeUsuario() {
        this.authService.getProfile().subscribe({
            next: (data) => {
                this.userName = data.userFirstName;
            },
            error: () => {
                this.userName = 'Aluno(a)';
            }
        });
    }
}
