import { Component, OnInit } from '@angular/core';
import { ExpenseService, Analytics } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  getCategoryKeys(): string[] {
    return this.analytics?.byCategory ? Object.keys(this.analytics.byCategory) : [];
  }

  getCategoryValue(category: string): number {
    return this.analytics?.byCategory[category] || 0;
  }
}