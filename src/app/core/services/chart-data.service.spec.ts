import { Position } from "../models/position";
import { ChartDataService } from "./chart-data.service";

describe('ChartDataService', () => {
    it('Get Pie By Sectors', () => {
        const service = new ChartDataService();
        const fakeData: Position[] = [
            {isin: 'A', name: 'A', sector: 'Equity', qty:10, price:2 },
            {isin: 'B', name: 'B', sector: 'Fixed', qty:5, price:4 },
            {isin: 'C', name: 'C', sector: 'Equity', qty:2, price:10 }
        ]
        const pie = service.pieBySectorArray(fakeData);
        expect(pie.find(p => p.name === 'Equity')?.y).toBe(10*2 + 2*10);
        expect(pie.find(p => p.name === 'Fixed')?.y).toBe(5*4);
    })
});