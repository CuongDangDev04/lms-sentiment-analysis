import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from './interfaces/roles'; // Import Role Enum
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: {
    id: number;
    username: string;
    fullname: string;
    role: Role;
  } | null = null;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:5000/api/auth/login', { username, password })
      .pipe(
        map((response: any) => {
          // Lưu token vào localStorage
          localStorage.setItem('token', response.token);

          // Lưu thông tin đầy đủ của người dùng vào localStorage (id, username, fullname, role, email)
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: response.user.id,
              username: response.user.username,
              fullname: response.user.fullname,
              role: response.user.role,
            })
          );

          // Gán giá trị vào đối tượng user của service
          this.user = {
            id: response.user.id,
            username: response.user.username,
            fullname: response.user.fullname,
            role: response.user.role,
          };

          return response;
        })
      );
  }

  // Hàm tải thông tin người dùng từ localStorage
  loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.user = JSON.parse(user); // Lấy thông tin người dùng từ localStorage
    }
  }

  getUser() {
    return this.user;
  }

  // Hàm kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    return this.user !== null;
  }

  // Hàm đăng xuất
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
  }

  // Hàm lấy thông tin người dùng từ API
  fetchUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get('http://localhost:5000/api/auth/user', { headers })
      .pipe(
        map((response: any) => {
          if (response.user) {
            // Lưu chỉ các thuộc tính cần thiết của user vào localStorage
            const user = {
              id: response.user.id,
              fullname: response.user.fullname,
              role: response.user.role,
              username: response.user.username,
              avt: response.user.avatar,
            };

            localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin vào localStorage
            this.user = user; // Gán thông tin vào service
          }
          return response.user;
        })
      );
  }
}
