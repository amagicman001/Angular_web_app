import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  error: string | null = null;
  editMode = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: [''],
      cover_image: [''],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.bookId) {
      this.editMode = true;
      this.loading = true;
      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue(book);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load book';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    if (this.bookForm.invalid) return;
    this.loading = true;
    this.error = null;
    const bookData = this.bookForm.value;
    if (this.editMode && this.bookId) {
      this.bookService.updateBook(this.bookId, bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => {
          this.error = err.error?.message || 'Update failed';
          this.loading = false;
        }
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => {
          this.error = err.error?.message || 'Add failed';
          this.loading = false;
        }
      });
    }
  }
}
