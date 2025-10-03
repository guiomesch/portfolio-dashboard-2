import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Portfolio } from "../models/portfolio";
import { of, delay } from "rxjs";
import { Position } from "../models/position";
import { TimePoint } from "../models/timeseries";

@Injectable({providedIn: 'root'})
export class PortfolioService {

    constructor(private http: HttpClient){}

    //simulate http call
    private readonly LATENCY = 250;

    //get mocked portfolios
    getPortfolios() {
        const data: Portfolio[] = [
            {id: 'P01', name: 'Global Balance'},
            {id: 'P02', name: 'Equity Europe'},
            {id: 'P03', name: 'USD Bonds'}
        ];
        return of(data).pipe(delay(this.LATENCY));
    }

    getPositions(portfolioId: string){
        const base: Position[] = [    
            { isin: 'LU0001', name: 'Fund A', sector: 'Equity', qty: 120, price: 101.2 },
            { isin: 'LU0002', name: 'Fund B', sector: 'Equity', qty: 60, price: 89.5 },
            { isin: 'LU0003', name: 'Bond C', sector: 'Fixed Income', qty: 220, price: 98.1 },
            { isin: 'LU0004', name: 'ETF D', sector: 'Equity', qty: 45, price: 310.0 },
        ]
        // Small variation per portfolio
        const factor = 1 + (portfolioId.charCodeAt(2) % 7) / 100;
        const mutated = base.map(p => ({ ...p, price: +(p.price * factor).toFixed(2), qty:  +(p.qty +portfolioId.charCodeAt(2)) }));
        return of(mutated).pipe(delay(this.LATENCY));
    }

    getTimeSeries(portfolioId: string) {
        const id = portfolioId.charCodeAt(2) * Math.random();
        let v = 1000000 + id * 1000;
        const series: TimePoint[] = Array.from({ length: 12 }).map((_, i) => {
        v = v * (1 + (Math.sin((i + id) / 3) / 100));
        return { t: new Date(Date.now() - (11 - i) * 30 * 24 * 3600000).toISOString().slice(0, 10), value: Math.round(v) };
        });
        return of(series).pipe(delay(this.LATENCY));
    }

}