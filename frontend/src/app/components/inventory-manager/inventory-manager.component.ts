import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.scss']
})
export class InventoryManagerComponent implements OnInit {
  books: any[] = [];
  lowStock: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private inventoryService: InventoryService, private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load books';
        this.loading = false;
      }
    });
    this.loadLowStock();
  }

  updateStock(bookId: number, change: number) {
    this.inventoryService.updateStock(bookId, change).subscribe(() => {
      this.books = this.books.map(b => b.id === bookId ? { ...b, stock: b.stock + change } : b);
      this.loadLowStock();
    });
  }

  loadLowStock() {
    this.inventoryService.getLowStock().subscribe({
      next: (books) => this.lowStock = books,
      error: () => this.lowStock = []
    });
  }

  getOutOfStockCount(): number {
    return this.books.filter(book => book.stock === 0).length;
  }
}
