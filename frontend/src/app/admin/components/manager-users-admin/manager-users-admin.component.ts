import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-users-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './manager-users-admin.component.html',
  styleUrls: ['./manager-users-admin.component.css'],
})
export class ManagerUsersAdminComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = []; // Lưu danh sách sau khi lọc
  currentPage: number = 1; // Trang hiện tại
  pageSize: number = 7; // Số lượng mục trên mỗi trang
  totalPages: number = 1; // Tổng số trang
  newUser: User = {
    id: 0,
    username: '',
    password: '',
    fullname: '',
    role: '',
    email: '',
    avt: '',
    birthdate: '',
    phone: '',
    isApproved: true,
    isRejected: true
  };
  isEditing = false;
  isAdding = false; // Kiểm soát hiển thị form thêm

  // Tiêu chí tìm kiếm
  searchCriteria = {
    name: '',
    email: '',
    id: '',
    role: '',
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();

  }

  // Tải danh sách người dùng
loadUsers() {
  // Lấy danh sách sinh viên
  this.userService.getAllStudents().subscribe((students) => {
    this.users = [...students]; // Gán danh sách sinh viên

    // Lấy danh sách giảng viên
    this.userService.getAllInstructors().subscribe((instructors) => {
      this.users = [...this.users, ...instructors]; // Kết hợp danh sách

      // Sắp xếp danh sách theo `isApproved`
      this.users.sort((a, b) => {
        if (!a.isApproved && b.isApproved) return -1; // `isApproved: false` lên trước
        if (a.isApproved && !b.isApproved) return 1; // `isApproved: true` xuống sau
        return 0; // Nếu giống nhau thì giữ nguyên thứ tự
      });

      // Tính tổng số trang và cập nhật danh sách hiển thị
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.updateFilteredUsers();
    });
  });
}

  updateFilteredUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize; // Vị trí bắt đầu
    const endIndex = startIndex + this.pageSize; // Vị trí kết thúc
    this.filteredUsers = this.users.slice(startIndex, endIndex); // Cắt dữ liệu theo trang
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredUsers();
      window.scrollTo(0, 0);


    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredUsers();
      window.scrollTo(0, 0);

    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFilteredUsers();
      window.scrollTo(0, 0);

    }
  }
  // Tính tổng số trang
  getPages(): number[] {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  // Phương thức tìm kiếm
  searchUsers() {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (!this.searchCriteria.name ||
          user.fullname.toLowerCase().includes(this.searchCriteria.name.toLowerCase())) &&
        (!this.searchCriteria.email ||
          user.email.toLowerCase().includes(this.searchCriteria.email.toLowerCase())) &&
        (!this.searchCriteria.id ||
          user.id.toString().includes(this.searchCriteria.id)) &&
        (!this.searchCriteria.role || user.role === this.searchCriteria.role)
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



  isFormValid(): boolean {
    return (
      this.newUser.fullname.trim() !== '' &&
      this.newUser.role.trim() !== '' &&
      this.newUser.email.trim() !== '' &&
      (!this.isEditing || (this.isEditing && this.newUser.password?.trim() === ''))
    );
  }

  editUser(user: User) {
    this.newUser = { ...user };
    this.isEditing = true;
    window.scrollTo(0, 0);
    this.isEditing = true;
    this.isAdding = false;
  }

  updateUser() {
    const errorMessages: string[] = [];

    if (this.newUser.fullname.trim() === '') {
      errorMessages.push('Vui lòng nhập tên người dùng.');
    }
    if (this.newUser.email.trim() === '') {
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
      password: this.newUser.password?.trim() === '' ? this.newUser.password : this.newUser.password,
    };

    if (this.newUser.role === 'student') {
      this.userService.updateStudent(this.newUser.id, updateUser).subscribe(() => {
        this.loadUsers();
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Người dùng ${this.newUser.username} đã được cập nhật.`,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      });
    } else if (this.newUser.role === 'instructor') {
      this.userService.updateInstructor(this.newUser.id, updateUser).subscribe(() => {
        this.loadUsers();
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Người dùng ${this.newUser.username} đã được cập nhật.`,
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
      username: '',
      password: '',
      fullname: '',
      role: '',
      email: '',
      avt: '',
      birthdate: '',
      phone: '',
      isApproved: true,
      isRejected: true
    };
    this.isEditing = false;
  }
  createUser() {
    const errorMessages: string[] = [];

    // Kiểm tra form có hợp lệ hay không
    if (this.newUser.fullname.trim() === '') {
      errorMessages.push('Vui lòng nhập tên người dùng.');
    }
    if (this.newUser.email.trim() === '') {
      errorMessages.push('Vui lòng nhập email.');
    }
    if (this.newUser.password.trim() === '') {
      errorMessages.push('Vui lòng nhập mật khẩu.');
    }
    if (this.newUser.role.trim() === '') {
      errorMessages.push('Vui lòng chọn vai trò.');
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

    // Gửi yêu cầu tạo user
    const createFunction =
      this.newUser.role === 'student'
        ? this.userService.createStudent(this.newUser)
        : this.userService.createInstructor(this.newUser);

    createFunction.subscribe(
      () => {
        this.loadUsers(); // Cập nhật danh sách user
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: `Người dùng đã được tạo.`,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        this.resetForm(); // Reset form
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi khi tạo người dùng. Vui lòng thử lại.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
      }
    );
  }

  toggleAddUserForm() {
    this.isAdding = !this.isAdding; // Đổi trạng thái hiển thị form thêm
    if (this.isAdding) {
      this.isEditing = false; // Đóng form chỉnh sửa nếu đang mở
      this.resetForm(); // Đặt lại form khi chuyển đổi
    }
  }
  cancelAdd() {
    this.isAdding = false; // Ẩn form thêm và hiển thị lại nút
    this.resetForm();
  }

  approveInstructor(userId: number, action: string) {
    Swal.fire({
      title: 'Xác nhận hành động',
      text: action === 'approve' ? 'Bạn chắc chắn muốn phê duyệt giảng viên này?' : 'Bạn chắc chắn muốn từ chối giảng viên này và xóa tài khoản của họ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Tiến hành phê duyệt hoặc từ chối nếu người dùng xác nhận
        this.userService.approveInstructor(userId, action).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: action === 'approve' ? 'Phê duyệt thành công!' : 'Từ chối thành công!',
              text: action === 'approve' ? 'Giảng viên đã được phê duyệt.' : 'Giảng viên đã bị từ chối và tài khoản đã bị xóa.',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            });
            // Tải lại danh sách người dùng sau khi phê duyệt hoặc từ chối
            this.loadUsers();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: 'Đã xảy ra lỗi khi phê duyệt hoặc từ chối giảng viên.',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
            });
          }
        );
      }
    });
  }




}
