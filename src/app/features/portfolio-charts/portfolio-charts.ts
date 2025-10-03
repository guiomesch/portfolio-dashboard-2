import { PortfolioService } from './../../core/services/portfolio.service';
import { Component, effect, inject, input } from "@angular/core";
import { Position } from "../../core/models/position";
import {MatTabsModule} from '@angular/material/tabs';
import * as Highcharts from 'highcharts';
import { ChartConstructorType, HighchartsChartComponent } from 'highcharts-angular';

@Component({
    selector : 'app-portfolio-charts',
    imports: [MatTabsModule, HighchartsChartComponent],
    styleUrl: './portfolio-charts.scss',
    templateUrl: './portfolio-charts.html'

})
export class PortfolioChartsComponent {
    positions = input<Position[]>([]);
    portfolioId = input<string>("");

    portfolioService = inject(PortfolioService);

    chartConstructor: ChartConstructorType = 'chart';
    pieOptions: Highcharts.Options = {};
    lineOptions: Highcharts.Options = {};

   constructor() {
    effect(() => {
        const bySector = this.positions().reduce<Record<string, number>>((acc, p) => {
        acc[p.sector] = (acc[p.sector] ?? 0) + p.qty * p.price;
        return acc;
        }, {});
        const pieData = Object.entries(bySector).map(([name, y]) => ({ name, y }));

        this.pieOptions = {
        title: { text: 'Répartition par secteur' },
        series: [{ type: 'pie', data: pieData as any }],
        tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b> ({point.y:,.0f})' }
        };

        this.portfolioService.getTimeSeries(this.portfolioId()).subscribe(ts => {
            this.lineOptions = {
                title: { text: 'Valeur du portefeuille' },
                xAxis: { categories: ts.map(p => p.t) },
                series: [{ type: 'line', name: 'NAV', data: ts.map(p => p.value) }]
            };
        });
    });
   } 
}