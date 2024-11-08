import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/roles';  // Import Role Enum
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: { role: Role } | null = null;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/login', { username, password }).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        this.user = { role: response.user.role };  // Gán giá trị role từ response vào user
        return response;
      })
    );
  }

  loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      // Giả sử bạn có thể decode token để lấy thông tin người dùng
      this.user = { role: Role.Student };  // Sử dụng Enum Role
    }
  }

  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
