import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { ScheduleService } from '../schedule/models/services/schedule.service';
import { ScheduleGetResponse } from '../schedule/models/schedule-get-response';
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
    public nextSchedule: ScheduleGetResponse | null = null;
    public proximoHorario: ScheduleGetResponse | null = null;


    constructor(
        private router: Router,
        private authService: AuthService,
        private projectService: StudyProjectService,
        private scheduleService: ScheduleService,
    ) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            this.router.navigate(['/login']);
            return;
        }

        this.carregarNomeUsuario();
        this.carregarRepositorios();
        this.carregarProximoHorario();

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

    carregarProximoHorario() {
        this.scheduleService.getAll().subscribe({
            next: (data) => {
                if (data.length > 0) {
                    this.proximoHorario = data[0];
                }
            },
            error: err => console.warn("Erro ao buscar horários", err)
        })
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
