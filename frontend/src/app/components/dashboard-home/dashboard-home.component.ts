import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  stats = [
    { title: 'Total Books', value: '1,247', icon: 'library_books', color: 'primary' },
    { title: 'Categories', value: '24', icon: 'category', color: 'accent' },
    { title: 'Low Stock', value: '8', icon: 'warning', color: 'warn' },
    { title: 'Revenue', value: '$12,450', icon: 'attach_money', color: 'success' }
  ];

  quickActions = [
    { title: 'Add New Book', subtitle: 'Expand your inventory', icon: 'add_circle', route: '/books/new' },
    { title: 'Manage Categories', subtitle: 'Organize your collection', icon: 'category', route: '/categories' },
    { title: 'Check Inventory', subtitle: 'Monitor stock levels', icon: 'inventory', route: '/inventory' },
    { title: 'View All Books', subtitle: 'Browse complete catalog', icon: 'library_books', route: '/books' }
  ];

  recentActivity = [
    { action: 'Added new book', item: '"The Great Gatsby"', time: '2 hours ago', icon: 'add' },
    { action: 'Updated stock for', item: '"To Kill a Mockingbird"', time: '4 hours ago', icon: 'edit' },
    { action: 'Created category', item: '"Science Fiction"', time: '1 day ago', icon: 'category' },
    { action: 'Low stock alert', item: '"1984" - Only 3 left', time: '2 days ago', icon: 'warning' }
  ];
}