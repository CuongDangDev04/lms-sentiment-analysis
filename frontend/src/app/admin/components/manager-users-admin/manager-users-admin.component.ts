import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-manager-users-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './manager-users-admin.component.html',
  styleUrls: ['./manager-users-admin.component.css'],
})
export class ManagerUsersAdminComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    id: 0,
    name: '',
    userId: 0,
    avt: '',
    user: {
      id: 0,
      username: '',
      email: '',
      role: '',
      fullname: '',
      password: '',
    }
  };
  isEditing = false;

  searchName = '';
  searchEmail = '';
  filterRole = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // Lấy dữ liệu sinh viên
    this.userService.getAllStudents().subscribe((students) => {
      this.users = [...students];  // Khởi tạo mảng users với students
      // Sau đó lấy dữ liệu giảng viên
      this.userService.getAllInstructors().subscribe((instructors) => {
        this.users = [...this.users, ...instructors];  // Gộp instructors vào mảng users
      });
    });
  }
  

  get filteredUsers() {
    return this.users.filter((user) => {
      return (
        (!this.searchName ||
          user.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (!this.searchEmail ||
          user.user.email.toLowerCase().includes(this.searchEmail.toLowerCase())) &&
        (!this.filterRole || user.user.role === this.filterRole)
      );
    });
  }
  getRoleDisplay(role: string): string {
    switch (role) {
      case 'student':
        return 'Sinh viên';
      case 'instructor':
        return 'Giảng viên';
      default:
        return role;
    }
  }
  selectRole(role: string) {
    this.filterRole = role;
  }

  isFormValid(): boolean {
    return (
      this.newUser.name.trim() !== '' &&
      this.newUser.user.role.trim() !== '' &&
      this.newUser.user.email.trim() !== '' &&
      (!this.isEditing || (this.isEditing && this.newUser.user.password?.trim() === ''))
    );
  }

  editUser(user: User) {
    this.newUser = {
      id: user.id,
      userId: user.user.id,
      avt: user.avt,
      name: user.name,

      user: {
        password: '',

        id: user.user.id,
        username: user.user.username,
        email: user.user.email,
        role: user.user.role,
        fullname: user.user.fullname,
      }
    };
    this.isEditing = true;
    window.scrollTo(0, 0);
  }

  updateUser() {
    const errorMessages: string[] = [];
  
    if (this.newUser.name.trim() === '') {
      errorMessages.push('Vui lòng nhập tên người dùng.');
    }
    if (this.newUser.user.email.trim() === '') {
      errorMessages.push('Vui lòng nhập email.');
    }
  
    if (errorMessages.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo!',
        text: errorMessages.join('\n'),
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
      return;
    }
  
    const updateUser = {
      ...this.newUser,
      password: this.newUser.user.password?.trim() === '' ? this.newUser.user.password : this.newUser.user.password,
    };
  
    if (this.newUser.user.role === 'student') {
      this.userService.updateStudent(this.newUser.id, updateUser).subscribe(() => {
        this.loadUsers();
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Người dùng ${this.newUser.user.username} đã được cập nhật.`,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      });
    } else if (this.newUser.user.role === 'instructor') {
      this.userService.updateInstructor(this.newUser.id, updateUser).subscribe(() => {
        this.loadUsers();
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Người dùng ${this.newUser.user.username} đã được cập nhật.`,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      });
    }
    this.resetForm();
  }
  

  deleteUser(userId: number, role: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      text: 'Hành động này không thể hoàn tác.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteFunction =
          role === 'student'
            ? this.userService.deleteStudent(userId)
            : this.userService.deleteInstructor(userId);
  
        deleteFunction.subscribe(() => {
          this.loadUsers();
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Người dùng đã được xóa.',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        });
      }
    });
  }
  

  resetForm() {
    this.newUser = {
      id: 0,
      name: '',
      userId: 0,
      avt: '',
      user: {
        id: 0,
        username: '',
        email: '',
        role: '',
        fullname: '',
      }
    };
    this.isEditing = false;
  }
}
