import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { LoginComponent } from './auth/components/login/login.component';
import { RegistrarComponent } from './auth/components/registrar/registrar.component';
import { Inicio } from './inicio/inicio'
import { MeusProjetos } from './meus-projetos/meus-projetos'
import { Biblioteca } from './biblioteca/biblioteca'

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
            { path: 'meus-projetos', component: MeusProjetos}
        ]
    },
];