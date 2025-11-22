import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { LoginComponent } from './auth/components/login/login.component';
import { RegistrarComponent } from './auth/components/registrar/registrar.component';
import { Inicio } from './inicio/inicio'
import { MeusProjetos } from './meus-projetos/meus-projetos'
import { Biblioteca } from './biblioteca/biblioteca'
import { Usuario } from './usuario/usuario';
import { ScheduleComponent } from './schedule/schedule-component';
import { ConfirmarEmailComponent } from './auth/components/confirmar-email/confirmar-email.component';
import { EsqueciSenhaComponent } from './auth/components/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './auth/components/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: BlankLayout,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegistrarComponent }
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: 'inicio', component: Inicio},
            { path: 'biblioteca', component: Biblioteca},
            { path: 'meus-projetos', component: MeusProjetos},
            { path: 'schedule', component: ScheduleComponent },
            { path : 'usuario', component: Usuario},
            { path: 'confirmar-email', component: ConfirmarEmailComponent },
            { path: 'esqueci-senha', component: EsqueciSenhaComponent },
            { path: 'recuperar-senha', component: RedefinirSenhaComponent }
        ]
    },
];