// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../models/roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }
  
    this.errorMessage = '';
  
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        console.log('User role:', response.user.role); // Đảm bảo vai trò được log đúng
  
        // Hiển thị thông báo đăng nhập thành công
        Swal.fire({
          title: 'Đăng nhập thành công!',
          text: `Chào mừng ${response.user.fullname}, bạn đã đăng nhập thành công.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Điều hướng người dùng đến trang tương ứng dựa trên vai trò
          switch (response.user.role) {
            case Role.Admin:
              console.log('Navigating to /admin');
              this.router.navigate(['/admin']);
              break;
            case Role.Instructor:
              console.log('Navigating to /instructors');
              this.router.navigate(['/instructors']);
              break;
            case Role.Student:
              console.log('Navigating to /student');
              this.router.navigate(['/student']);
              break;
            default:
              console.log('Navigating to /');
              this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Đăng nhập không thành công! Kiểm tra lại thông tin.';
      }
    );
  }
  
}
