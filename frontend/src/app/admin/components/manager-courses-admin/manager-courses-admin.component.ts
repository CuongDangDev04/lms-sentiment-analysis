import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service'; // Đường dẫn tới service
import { Category, Course, Instructor } from '../../interfaces/Course'; // Đường dẫn tới interface
import { UserService } from '../../services/user.service';

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
  categories: Category[] = []; // Danh sách danh mục
  category: Partial<Category> = {}; // Danh mục hiện tại
  instructors: Instructor[] = [];

  isEditing = false; // Trạng thái chỉnh sửa khóa học
  isAdding = false; // Trạng thái thêm khóa học
  

  constructor(private courseService: CourseService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadCourses(); // Gọi API lấy danh sách khóa học
    this.loadCategories();
    this.loadInstructors();
  }
  loadCategories(): void {
    this.courseService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data; // Gán dữ liệu danh mục vào mảng
      },
      error: () => {
        console.error('Lỗi khi tải danh sách danh mục.');
      },
    });
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
  loadInstructors(): void {
    this.userService.getAllInstructors().subscribe({
      next: (data) => {
        this.instructors = data; // Gán dữ liệu giảng viên vào mảng instructors
      },
      error: () => {
        console.error('Lỗi khi tải danh sách giảng viên.');
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
          Swal.fire('Cập nhật thành công', 'Khóa học đã được cập nhật.', 'success');
          this.loadCourses();
          this.resetForm();
        },
        error: () => {
          Swal.fire('Cập nhật thất bại', 'Không thể cập nhật khóa học.', 'error');
        },
      });
    } else {
      // Thêm mới khóa học
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          Swal.fire('Thêm thành công', 'Khóa học đã được thêm.', 'success');
          this.loadCourses();
          this.resetForm();
        },
        error: () => {
          Swal.fire('Thêm thất bại', 'Không thể thêm khóa học.', 'error');
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
            Swal.fire('Đã xóa!', 'Khóa học đã bị xóa.', 'success');
            this.loadCourses();
          },
          error: () => {
            Swal.fire('Xóa thất bại', 'Không thể xóa khóa học.', 'error');
          },
        });
      }
    });
  }

  // Hiển thị form thêm khóa học
  toggleAddCourseForm(): void {
    this.isAdding = !this.isAdding;
    if (this.isAdding) {
      this.isEditing = false;
      this.resetForm();
    }
  }

  // Hủy bỏ thêm khóa học
  cancelAdd(): void {
    this.isAdding = false;
    this.resetForm();
  }

  
}
