import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  fullname: string = '';
  id: string = ''; 
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = ''; // Biến chứa thông báo lỗi
  
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu nhập lạikhông khớp!';
      return;
    }

    const body = {
      id: this.id,
      username: this.username,
      fullname: this.fullname,
      password: this.password,
      role: 'sinhvien'
    };

    this.http.post('http://localhost:5000/api/auth/register', body).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
        this.router.navigate(['/']); // Giả sử trang đăng nhập có đường dẫn là '/'
      },
      error => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.';
      }
    );
  }
}
