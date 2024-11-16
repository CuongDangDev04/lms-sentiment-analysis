import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../interfaces/NewUser';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-create-user-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user-admin.component.html',
  styleUrls: ['./create-user-admin.component.css'],
})
export class CreateUserAdminComponent {
  newUser: NewUser = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    id: 0,
  };
  selectedRole: string = ''; // Giả sử vai trò mặc định là 'student'

  constructor(private userService: UserService, private router: Router) {} // Tiêm Router vào constructor

  createUser() {
    // Kiểm tra các trường cần thiết
    if (this.newUser.username && this.newUser.password && this.newUser.email && this.newUser.fullname) {
      const userData = { ...this.newUser, role: this.selectedRole };

      if (this.selectedRole === 'student') {
        this.userService.createStudent(userData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Tạo tài khoản thành công!',
              text: `Sinh viên ${this.newUser.username} đã được tạo.`,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            }).then(() => {
              // Sau khi thông báo, chuyển hướng đến trang quản lý người dùng
              this.router.navigate(['/quanlynguoidung']);
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: `Không thể tạo tài khoản sinh viên: ${error.message}`,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
            });
          }
        );
      } else if (this.selectedRole === 'instructor') {
        this.userService.createInstructor(userData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Tạo tài khoản thành công!',
              text: `Giảng viên ${this.newUser.username} đã được tạo.`,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            }).then(() => {
              // Sau khi thông báo, chuyển hướng đến trang quản lý người dùng
              this.router.navigate(['admin/quanlynguoidung']);
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: `Không thể tạo tài khoản giảng viên: ${error.message}`,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
            });
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng điền đầy đủ thông tin!',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-warning',
        },
      });
    }
  }
}
