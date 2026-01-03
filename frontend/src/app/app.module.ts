import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// Services
import { ExpenseService } from './services/expense.service';
import { AuthService } from './services/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    AnalyticsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  // THIS IS REQUIRED for ngModel
  ],
  providers: [
    ExpenseService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }