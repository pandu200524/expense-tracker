import { Component, OnInit } from '@angular/core';
import { ExpenseService, Analytics } from '../../services/expense.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analytics: Analytics | null = null;
  loading = true;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.expenseService.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
        this.loading = false;
      }
    });
  }

  getCategoryEntries(): {category: string, amount: number, percentage: number}[] {
    if (!this.analytics) return [];
    
    return Object.entries(this.analytics.byCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / this.analytics!.total) * 100
    })).sort((a, b) => b.amount - a.amount);
  }

  getMonthEntries(): {month: string, amount: number}[] {
    if (!this.analytics) return [];
    
    return Object.entries(this.analytics.byMonth).map(([month, amount]) => ({
      month,
      amount
    }));
  }
}