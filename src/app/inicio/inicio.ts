import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../auth/services/auth.service';
import { StudyProjectService, StudyProject } from '../study-project/services/study-project.service';

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
    public repositories: StudyProject[] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        private projectService: StudyProjectService
    ) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            this.router.navigate(['/login']);
            return;
        }

        this.carregarNomeUsuario();
        this.carregarRepositorios();
    }

    goToCronograma(): void {
        this.router.navigate(['/schedule']);
    }

    goToRepositories(): void {
        this.router.navigate(['/meus-projetos']);
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

    carregarRepositorios() {
        this.projectService.getMyProjects().subscribe({
            next: (data) => {
                this.repositories = data.slice(0, 3);
            },
            error: (err) => console.warn('Erro ao carregar projetos', err)
        });
    }
}
