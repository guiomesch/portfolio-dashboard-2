import { Component, computed, inject, signal } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatListModule} from '@angular/material/list';
import { Portfolio } from "../../core/models/portfolio";
import { PortfolioService } from "../../core/services/portfolio.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Position } from "../../core/models/position";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PortfolioTable } from "../portfolio-table/portfolio-table";
import { PortfolioChartsComponent } from "../portfolio-charts/portfolio-charts";

@Component({
selector: 'portfolio-shell',
imports: [MatToolbarModule, MatListModule, RouterModule, MatProgressBarModule, MatSelectModule, MatInputModule, ReactiveFormsModule, PortfolioTable, PortfolioChartsComponent],
templateUrl : 'portfolio-shell.html',
styleUrl: 'portfolio-shell.scss'
})

export class PortfolioShellComponent {
    private _portFolioService = inject(PortfolioService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    //Snackbar for showing messages
    private _snackBar = inject(MatSnackBar);

    currentId = signal<string>('P01')
    portfolios = signal<Portfolio[] | null>(null);
    positions = signal<Position[]>([]);

    filterCtrl = new FormControl('', { nonNullable: true });

    filteredPositions = computed(() => {
        const q = (this.filterCtrl.value ?? '').toLowerCase().trim();
        if(!q) return this.positions();
        return this.positions().filter(p => (p.isin + ' '+ p.name).toLowerCase().includes(q));
    });

    constructor() {
        this._portFolioService.getPortfolios().subscribe({
            next: list => this.portfolios.set(list),
            error: () => this._snackBar.open('Erreur chargement portefeuilles', 'Fermer', { duration: 3000 })
        }); 
        this.route.paramMap.subscribe(pm => {
            const id = pm.get('id') ?? 'P01';
            this.currentId.set(id);
            this.loadPositions(id);
        });
    }

    private loadPositions(id: string) {
        this._portFolioService.getPositions(id).subscribe({
            next: list => this.positions.set(list),
            error: () => this._snackBar.open('Erreur chargement position', 'Fermer', {duration: 3000})
        });
    }

    goto(id: string){
        this.router.navigate(['/p', id]);
    }

}