import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  fullname: string = '';
  id: string = ''; 
  password: string = '';
  confirmPassword: string = '';
  role: string = ''; // Thêm biến role để lưu vai trò
  errorMessage: string = ''; // Biến chứa thông báo lỗi
  
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // Kiểm tra nếu mật khẩu nhập lại không khớp
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu nhập lại không khớp!';
      return;
    }
  
    // Kiểm tra nếu vai trò chưa được chọn
    if (!this.role) {
      this.errorMessage = 'Vui lòng chọn vai trò!';
      return;
    }
  
    const body = {
      id: this.id,
      username: this.username,
      fullname: this.fullname,
      password: this.password,
      role: this.role // Gửi vai trò đã chọn lên server
    };
  
    this.http.post('http://localhost:5000/api/auth/register', body).subscribe(
      response => {
        console.log('Đăng ký thành công:', response);
        // Hiển thị SweetAlert khi đăng ký thành công
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Bạn sẽ được chuyển đến trang đăng nhập.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
          this.router.navigate(['/']); // Giả sử trang đăng nhập có đường dẫn là '/'
        });
      },
      error => {
        console.error('Đăng ký thất bại:', error);
        this.errorMessage = 'Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.';
      }
    );
  }
  
}
