import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  getCategory(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  addCategory(category: any): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.post(this.apiUrl, category, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  updateCategory(id: number, category: any): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.put(`${this.apiUrl}/${id}`, category, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  deleteCategory(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }
}
