import { Injectable } from "@angular/core";
import { Position } from "../models/position";

@Injectable({providedIn: 'root'})
export class ChartDataService {
    pieBySector(positions: Position) { return []; }
    pieBySectorArray(positions: Position[]) {
    const bySector = positions.reduce<Record<string, number>>((acc, p) => {
    acc[p.sector] = (acc[p.sector] ?? 0) + (p.qty * p.price);
    return acc;
    }, {});
    //transform key/value for pie highchart
    return Object.entries(bySector).map(([sector, value]) => ({ name: sector, y: value }));
    }
}