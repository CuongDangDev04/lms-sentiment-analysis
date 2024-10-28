import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Khai báo biến cho username
  password: string = ''; // Khai báo biến cho password
  errorMessage: string = ''; // Khai báo biến cho thông báo lỗi

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Kiểm tra nếu người dùng chưa nhập đủ thông tin
    if (!this.username || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }

    // Xóa thông báo lỗi trước khi gọi API
    this.errorMessage = '';

    // Gọi API đăng nhập
    this.http.post('http://localhost:5000/api/auth/login', {
      username: this.username,
      password: this.password,
    })
    .subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token); // Giả sử response chứa token
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Đăng nhập không thành công! Kiểm tra lại thông tin.'; // Hiển thị thông báo lỗi
      }
    );
  }
}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { NgIf } from '@angular/common';
// import { ReCaptchaV3Service, RecaptchaModule } from 'ng-recaptcha';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, HttpClientModule, NgIf, RecaptchaModule], // Nhập ReCaptchaModule
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   captchaToken: string = '';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private recaptchaV3Service: ReCaptchaV3Service
//   ) {}

//   onCaptchaResolved(captchaResponse: string | null) {
//     if (captchaResponse) { // Kiểm tra nếu captchaResponse không phải là null
//       console.log(`Captcha đã được giải quyết với phản hồi: ${captchaResponse}`);
//       this.captchaToken = captchaResponse; // Lưu lại token CAPTCHA
//     } else {
//       this.errorMessage = 'Có lỗi xảy ra với reCAPTCHA'; // Thông báo lỗi nếu captchaResponse là null
//     }
//   }

//   onSubmit() {
//     if (!this.username || !this.password) {
//       this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
//       return;
//     }

//     this.recaptchaV3Service.execute('login').subscribe({
//       next: (token: string) => {
//         this.captchaToken = token; 
//         this.login();
//       },
//       error: () => {
//         this.errorMessage = 'Có lỗi xảy ra với reCAPTCHA';
//       },
//     });
//   }

//   login() {
//     this.http
//       .post('http://localhost:5000/api/auth/login', {
//         username: this.username,
//         password: this.password,
//         recaptchaToken: this.captchaToken,
//       })
//       .subscribe(
//         (response: any) => {
//           console.log('Đăng nhập thành công:', response);
//           localStorage.setItem('token', response.token);
//           this.router.navigate(['/home']);
//         },
//         () => {
//           this.errorMessage = 'Đăng nhập không thành công! Kiểm tra lại thông tin.';
//         }
//       );
//   }
// }
