import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'http://localhost:5000/inventory';

  constructor(private http: HttpClient) {}

  updateStock(bookId: number, change: number): Observable<any> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.post(`${this.apiUrl}/update`, { bookId, change }, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }

  getLowStock(threshold: number = 5): Observable<any[]> {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    return this.http.get<any[]>(`${this.apiUrl}/low-stock?threshold=${threshold}`, {
      headers: { Authorization: 'Bearer ' + (token || '') }
    });
  }
}
