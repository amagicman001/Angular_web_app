import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { CategoryService } from './services/category.service';
import { InventoryService } from './services/inventory.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BookListComponent,
    BookFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    InventoryManagerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  { provide: 'canActivate', useValue: authGuard },
    AuthService,
    BookService,
    CategoryService,
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
