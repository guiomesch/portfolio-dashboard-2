import { Component, computed, input } from '@angular/core';
import { marketValue, Position } from '../../core/models/position';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-portfolio-table',
  imports: [MatTableModule,MatSortModule],
  templateUrl: './portfolio-table.html',
  styleUrl: './portfolio-table.scss'
})
export class PortfolioTable {
  positions = input<Position[]>([]);
  cols = ['isin', 'name', 'qty', 'price', 'mv'];
  mv = marketValue;

  sorted = computed(() => {
  return [...this.positions()].sort((a, b) => marketValue(b) - marketValue(a));
  });
}
