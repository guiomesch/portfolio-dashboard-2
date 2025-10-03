import { PortfolioShellComponent } from './features/portfolio-shell/portfolio-shell';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'p/P01', pathMatch: 'full'},
    {
        path:'p/:id', 
        loadComponent: () => import('./features/portfolio-shell/portfolio-shell').then(c => c.PortfolioShellComponent)
    },
    {path: '**', redirectTo:'p/P01'}

];
