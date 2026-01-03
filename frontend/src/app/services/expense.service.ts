import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  paymentMethod: string;
}

export interface Analytics {
  total: number;
  count: number;
  byCategory: { [key: string]: number };
  byMonth: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/api/expenses`;

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getExpense(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(id: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.apiUrl}/analytics/summary`);
  }
}
