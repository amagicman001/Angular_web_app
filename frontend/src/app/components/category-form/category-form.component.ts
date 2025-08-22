import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  loading = false;
  error: string | null = null;
  editMode = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.categoryId) {
      this.editMode = true;
      this.loading = true;
      this.categoryService.getCategory(this.categoryId).subscribe({
        next: (category) => {
          this.categoryForm.patchValue(category);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load category';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    if (this.categoryForm.invalid) return;
    this.loading = true;
    this.error = null;
    const categoryData = this.categoryForm.value;
    if (this.editMode && this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, categoryData).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => {
          this.error = err.error?.message || 'Update failed';
          this.loading = false;
        }
      });
    } else {
      this.categoryService.addCategory(categoryData).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => {
          this.error = err.error?.message || 'Add failed';
          this.loading = false;
        }
      });
    }
  }
}
