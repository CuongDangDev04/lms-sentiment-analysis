import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
  instructorName: string;
}

@Component({
  selector: 'app-manager-courses-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './manager-courses-admin.component.html',
  styleUrls: ['./manager-courses-admin.component.css']
})
export class ManagerCoursesAdminComponent {
  course: Partial<Course> = {};
  courses: Course[] = [];
  instructors = [
    { id: 1, name: 'Giảng viên Kỹ năng mềm 1' },
    { id: 2, name: 'Giảng viên Kỹ năng mềm 2' },
    { id: 3, name: 'Giảng viên Kỹ năng mềm 3' },
  ];
  isEditing = false;

  constructor() {
    this.populateCourses();
  }

  populateCourses() {
    // Dữ liệu giả cho các khóa học về kỹ năng mềm
    this.courses = [
      {
        id: 1,
        name: 'Khóa học Giao tiếp hiệu quả',
        description: 'Khóa học giúp cải thiện kỹ năng giao tiếp và xây dựng mối quan hệ.',
        instructorId: 1,
        instructorName: 'Giảng viên Kỹ năng mềm 1',
      },
      {
        id: 2,
        name: 'Khóa học Quản lý thời gian',
        description: 'Khóa học cung cấp các kỹ thuật quản lý thời gian hiệu quả.',
        instructorId: 2,
        instructorName: 'Giảng viên Kỹ năng mềm 2',
      },
      {
        id: 3,
        name: 'Khóa học Giải quyết xung đột',
        description: 'Khóa học giúp học viên nắm bắt và xử lý xung đột trong môi trường làm việc.',
        instructorId: 3,
        instructorName: 'Giảng viên Kỹ năng mềm 3',
      },
      {
        id: 4,
        name: 'Khóa học Làm việc nhóm',
        description: 'Khóa học phát triển kỹ năng làm việc nhóm hiệu quả và hợp tác.',
        instructorId: 1,
        instructorName: 'Giảng viên Kỹ năng mềm 1',
      },
      {
        id: 5,
        name: 'Khóa học Tư duy phản biện',
        description: 'Khóa học giúp phát triển tư duy phản biện và khả năng phân tích.',
        instructorId: 2,
        instructorName: 'Giảng viên Kỹ năng mềm 2',
      },
      {
        id: 6,
        name: 'Khóa học Kỹ năng thuyết trình',
        description: 'Khóa học giúp nâng cao kỹ năng thuyết trình và truyền đạt thông tin.',
        instructorId: 3,
        instructorName: 'Giảng viên Kỹ năng mềm 3',
      }
    ];
  }

  onSubmit() {
    const errorMessages: string[] = [];
  
    if (!this.course.name) {
      errorMessages.push('Vui lòng nhập tên khóa học.');
    }
  
    if (!this.course.description) {
      errorMessages.push('Vui lòng nhập mô tả cho khóa học.');
    }
  
    if (this.course.instructorId === undefined) {
      errorMessages.push('Vui lòng chọn giảng viên.');
    }
  
    if (errorMessages.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo!',
        text: errorMessages.join('\n'),
        confirmButtonText: 'Đã hiểu',
      });
      return;
    }
  
    const instructorName = this.getInstructorName(this.course.instructorId as number); // Cast to number
  
    if (this.isEditing && this.course.id !== undefined) {
      const index = this.courses.findIndex(c => c.id === this.course.id);
      if (index !== -1) {
        this.courses[index] = {
          ...this.course,
          instructorId: this.course.instructorId as number, // Cast to number
          instructorName: instructorName,
        } as Course;
      }
    } else {
      const newCourse: Course = {
        id: this.courses.length + 1,
        name: this.course.name || '',
        description: this.course.description || '',
        instructorId: this.course.instructorId as number, // Cast to number
        instructorName: instructorName,
      };
      this.courses = [...this.courses, newCourse];
    }
  
    this.resetForm();
  }
  

  editCourse(course: Course) {
    this.course = { ...course };
    this.isEditing = true;
    window.scrollTo(0, 0);
  }

  deleteCourse(id: number) {
    const courseToDelete = this.courses.find(course => course.id === id);
    if (courseToDelete) {
      Swal.fire({
        title: `Bạn có chắc xóa khóa học (${courseToDelete.name}) không?`,
        text: 'Bạn sẽ không thể khôi phục lại!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận!',
        cancelButtonText: 'Hủy',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.courses = this.courses.filter(course => course.id !== id);
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Khóa học đã được xóa.',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      });
    }
  }

  resetForm() {
    this.course = {};
    this.isEditing = false;
  }

  getInstructorName(instructorId: number | undefined): string {
    const instructor = this.instructors.find(i => i.id == instructorId);
    return instructor ? instructor.name : '';
  }
}
