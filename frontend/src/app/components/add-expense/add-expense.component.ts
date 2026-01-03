import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService, Expense } from '../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  expense: Expense = {
    title: '',
    amount: 0,
    category: 'Food',
    date: new Date(),
    description: '',
    paymentMethod: 'Cash'
  };

  categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];
  paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.expenseService.createExpense(this.expense).subscribe({
      next: (response) => {
        alert('Expense added successfully!');
        this.router.navigate(['/expenses']);
      },
      error: (error) => {
        console.error('Error adding expense:', error);
        alert('Failed to add expense. Please try again.');
      }
    });
  }
}