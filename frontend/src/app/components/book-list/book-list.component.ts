import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookService: BookService, private router: Router) {}

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
  }

  editBook(id: number) {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number) {
    if (!confirm('Delete this book?')) return;
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(b => b.id !== id);
    });
  }
}
