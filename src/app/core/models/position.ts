export interface Position {
    isin: string;
    name: string;
    sector: string;
    qty: number;
    price: number;    
}

export const marketValue = (p: Position) => p.qty * p.price;