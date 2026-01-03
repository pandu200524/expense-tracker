import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  loading = true;
  searchTerm = '';
  selectedCategory = 'All';
  categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.filteredExpenses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.loading = false;
      }
    });
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (expense.description?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCategory = this.selectedCategory === 'All' || expense.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  deleteExpense(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.loadExpenses();
          alert('Expense deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
          alert('Failed to delete expense.');
        }
      });
    }
  }

  getTotalAmount(): number {
    return this.filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
}