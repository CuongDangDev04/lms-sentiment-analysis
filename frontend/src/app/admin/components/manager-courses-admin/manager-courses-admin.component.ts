import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service'; // Đường dẫn tới service
import { Course } from '../../interfaces/Course'; // Đường dẫn tới interface

@Component({
  selector: 'app-manager-courses-admin',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './manager-courses-admin.component.html',
  styleUrls: ['./manager-courses-admin.component.css']
})
export class ManagerCoursesAdminComponent implements OnInit {
  courses: Course[] = []; // Danh sách khóa học
  course: Partial<Course> = {}; // Khóa học hiện tại
  
  isEditing = false; // Trạng thái chỉnh sửa
  isAdding = false;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(); // Gọi API lấy danh sách khóa học
  }

  // Lấy danh sách khóa học
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data; // Gán dữ liệu khóa học vào mảng
      },
      error: () => {
        console.error('Lỗi khi tải danh sách khóa học.');
      },
    });
  }

  // Chỉnh sửa khóa học
  editCourse(course: Course): void {
    this.course = { ...course };
    window.scrollTo(0, 0);

    this.isEditing = true;
    this.isAdding = false;
  }

  // Xử lý thêm hoặc cập nhật khóa học
  onSubmit(): void {
    if (this.isEditing && this.course.id) {
      // Cập nhật khóa học
      this.courseService.updateCourse(this.course.id, this.course).subscribe({
        next: () => {
          Swal.fire('Cập nhật thành công', 'Khóa học đã được cập nhật.', 'success'); // SweetAlert khi cập nhật thành công
          this.loadCourses(); // Cập nhật lại danh sách khóa học
          this.resetForm();
        },
        error: () => {
          Swal.fire('Cập nhật thất bại', 'Không thể cập nhật khóa học.', 'error'); // SweetAlert khi có lỗi
        },
      });
    } else {
      // Thêm mới khóa học
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          Swal.fire('Thêm thành công', 'Khóa học đã được thêm.', 'success'); // SweetAlert khi thêm thành công
          this.loadCourses(); // Cập nhật lại danh sách khóa học
          this.resetForm();
        },
        error: () => {
          Swal.fire('Thêm thất bại', 'Không thể thêm khóa học.', 'error'); // SweetAlert khi có lỗi
        },
      });
    }
  }

  // Đặt lại form
  resetForm(): void {
    this.course = {};
    this.isEditing = false;
  }

  // Xóa khóa học
  deleteCourse(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại khóa học này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe({
          next: () => {
            Swal.fire('Đã xóa!', 'Khóa học đã bị xóa.', 'success'); // SweetAlert khi xóa thành công
            this.loadCourses(); // Cập nhật lại danh sách khóa học
          },
          error: () => {
            Swal.fire('Xóa thất bại', 'Không thể xóa khóa học.', 'error'); // SweetAlert khi có lỗi
          },
        });
      }
    });
  }
  toggleAddCourseForm(): void {
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
}
