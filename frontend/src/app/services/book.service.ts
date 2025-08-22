import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:5000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  getBook(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  addBook(book: any): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.post(this.apiUrl, book, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  updateBook(id: number, book: any): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.put(`${this.apiUrl}/${id}`, book, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  deleteBook(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }
}
