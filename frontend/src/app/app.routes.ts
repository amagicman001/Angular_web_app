import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [authGuard], children: [
    { path: '', component: DashboardHomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: BookFormComponent },
    { path: 'books/edit/:id', component: BookFormComponent },
    { path: 'categories', component: CategoryListComponent },
    { path: 'categories/new', component: CategoryFormComponent },
    { path: 'categories/edit/:id', component: CategoryFormComponent },
    { path: 'inventory', component: InventoryManagerComponent },
  ]},
  { path: '**', redirectTo: '' }
];
