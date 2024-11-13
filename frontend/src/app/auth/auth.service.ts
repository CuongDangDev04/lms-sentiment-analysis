import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../auth/interfaces/roles';  // Import Role Enum
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
        // Lưu token và user info vào localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ role: response.user.role }));  // Lưu thông tin user
        this.user = { role: response.user.role };  // Gán giá trị role từ response vào user
        return response;
      })
    );
  }

  loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.user = JSON.parse(user);  // Lấy thông tin user từ localStorage
      // Có thể thêm logic kiểm tra tính hợp lệ của token ở đây
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
    localStorage.removeItem('user');
    this.user = null;
  }
}
