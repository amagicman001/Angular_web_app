import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.localStorage.getItem('token');
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem('token');
  }
}
