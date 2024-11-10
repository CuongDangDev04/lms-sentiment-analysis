import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-manager-users-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './manager-users-admin.component.html',
  styleUrls: ['./manager-users-admin.component.css'],
})
export class ManagerUsersAdminComponent {
  users: User[] = [
    { id: 1, name: 'Nguyen Van A', role: 'sinhvien', email: 'a@student.edu' },
    { id: 2, name: 'Tran Thi B', role: 'giangvien', email: 'b@teacher.edu' },
    { id: 3, name: 'Le Van C', role: 'sinhvien', email: 'c@student.edu' },
    { id: 4, name: 'Pham Minh D', role: 'giangvien', email: 'd@teacher.edu' },
    { id: 5, name: 'Nguyen Thi E', role: 'sinhvien', email: 'e@student.edu' },
    { id: 6, name: 'Vo Van F', role: 'giangvien', email: 'f@teacher.edu' },
    { id: 7, name: 'Nguyen Van G', role: 'sinhvien', email: 'g@student.edu' },
    { id: 8, name: 'Tran Thi H', role: 'giangvien', email: 'h@teacher.edu' },
    { id: 9, name: 'Hoang Van I', role: 'sinhvien', email: 'i@student.edu' },
    { id: 10, name: 'Phan Van J', role: 'giangvien', email: 'j@teacher.edu' },
  ];

  newUser: User = { id: 0, name: '', role: '', email: '' };
  isEditing = false;

  // Các biến dùng cho tìm kiếm và lọc
  searchName = '';
  searchEmail = '';
  filterRole = '';

  get filteredUsers() {
    return this.users.filter((user) => {
      return (
        (!this.searchName ||
          user.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (!this.searchEmail ||
          user.email.toLowerCase().includes(this.searchEmail.toLowerCase())) &&
        (!this.filterRole || user.role === this.filterRole)
      );
    });
  }

  selectRole(role: string) {
    this.filterRole = role; // Cập nhật vai trò đã chọn
  }

  isFormValid(): boolean {
    return (
      this.newUser.name.trim() !== '' &&
      this.newUser.role.trim() !== '' &&
      this.newUser.email.trim() !== ''
    );
  }

  addUser() {
    // Khởi tạo mảng để chứa thông báo lỗi
    const errorMessages: string[] = [];

    // Kiểm tra từng trường và thêm thông báo lỗi nếu cần
    if (this.newUser.name.trim() === '') {
      errorMessages.push('Vui lòng nhập tên người dùng.');
    }
    if (this.newUser.role.trim() === '') {
      errorMessages.push('Vui lòng chọn vai trò cho người dùng.');
    }
    if (this.newUser.email.trim() === '') {
      errorMessages.push('Vui lòng nhập email.');
    }

    // Nếu có lỗi, hiển thị tất cả thông báo lỗi
    if (errorMessages.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo!',
        text: errorMessages.join('\n'), // Nối các thông báo bằng dòng mới
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
      return; // Dừng lại nếu thông tin không hợp lệ
    }

    if (this.isEditing) {
      // Cập nhật thông tin người dùng hiện tại
      const index = this.users.findIndex((user) => user.id === this.newUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.newUser };
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Người dùng ${this.newUser.name} đã được cập nhật.`,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    } else {
      // Thêm người dùng mới
      const newId =
        this.users.length > 0
          ? Math.max(...this.users.map((user) => user.id)) + 1
          : 1;
      this.users.push({ ...this.newUser, id: newId });

      // Hiển thị thông báo thành công khi thêm người dùng
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công!',
        text: `Người dùng ${this.newUser.name} đã được thêm.`,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
    }
    this.resetForm();
  }

  editUser(user: User) {
    this.newUser = { ...user };
    this.isEditing = true;
    window.scrollTo(0, 0);
  }

  deleteUser(userId: number) {
    const userToDelete = this.users.find((user) => user.id === userId);
    if (userToDelete) {
      Swal.fire({
        title: `Bạn có chắc xóa người dùng (${userToDelete.name}) không?`,
        text: 'Bạn sẽ không thể khôi phục lại! ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Thực hiện xóa người dùng
          this.users = this.users.filter((user) => user.id !== userId);
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Người dùng đã được xóa.',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        }
      });
    }
  }

  resetForm() {
    this.newUser = { id: 0, name: '', role: '', email: '' };
    this.isEditing = false;
  }
}
