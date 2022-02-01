import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { FundosComponent } from './fundo/fundo.component';
import { FundoEditarComponent } from './fundo/fundo-editar/fundo-editar.component';
import { FundoCriarComponent } from './fundo/fundo-criar/fundo-criar.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'fundo', component: FundosComponent },
    { path: 'fundo-criar', component: FundoCriarComponent },
    { path: 'fundo-editar/:id', component: FundoEditarComponent }
];