import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../interfaces/course'; 
import { AuthService } from '../../../auth/auth.service'; 
import Swal from 'sweetalert2'; // Import SweetAlert2
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-manager-student-instructor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-student-instructor.component.html',
  styleUrls: ['./manager-student-instructor.component.css']
})
export class ManagerStudentInstructorComponent implements OnInit {
  courses: Course[] = [];
  students: any[] = []; 
  isLoading: boolean = true; 
  errorMessage: string = ''; 
  searchName: string = ''; 
  searchEmail: string = ''; 
  selectedCourse: Course | null = null; 
  instructorId: string = ''; 
  filteredStudents: any[] = []; 

  // Các biến phân trang
  currentPage: number = 1;
  itemsPerPage: number = 7; // Số lượng sinh viên hiển thị trên mỗi trang
  totalPages: number = 0; // Tổng số trang
  paginatedStudents: any[] = []; // Danh sách sinh viên hiển thị cho trang hiện tại

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }

    this.fetchCourses();
    this.filteredStudents = [...this.students];
  }

  // Phương thức tính tổng số trang
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage);
  }

  // Phương thức phân trang
  paginateStudents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  // Chuyển đến trang trước
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateStudents();
    }
  }

  // Chuyển đến trang sau
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateStudents();
    }
  }

  // Chuyển đến trang bất kỳ
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateStudents();
    }
  }

  // Lấy danh sách các trang để hiển thị
  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Fetch dữ liệu khóa học từ backend
  fetchCourses(): void {
    if (!this.instructorId) {
      this.errorMessage = 'Instructor ID is missing.';
      this.isLoading = false;
      return;
    }

    this.courseService.getCoursesByInstructor(this.instructorId).subscribe(
      (data) => {
        this.courses = data || [];
        this.isLoading = false;

        this.courses.forEach(course => {
          course.studentsCount = course.students ? course.students.length : 0;
        });

        console.log('Fetched courses:', this.courses);
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    );
  }

  // Hiển thị danh sách sinh viên của khóa học
  viewStudentsInCourse(course: Course): void {
    this.selectedCourse = course;
    this.fetchStudentsFromCourse(course);
  }

  // Fetch sinh viên từ khóa học
  fetchStudentsFromCourse(course: Course): void {
    if (!course || !Array.isArray(course.students)) {
      console.warn('No students found in course:', course);
      return;
    }

    const flattenedStudents = course.students.map(student => ({
      ...student,
      courseName: course.name
    }));

    this.students = flattenedStudents;
    this.filteredStudents = [...this.students]; // Đồng bộ danh sách đã lọc
    this.calculateTotalPages();
    this.paginateStudents();
  }

  // Xem chi tiết sinh viên
  viewStudentDetails(student: any): void {
    Swal.fire({
      title: 'Student Details',
      html: `
        <strong>ID:</strong> ${student.id} <br>
        <strong>Name:</strong> ${student.fullname} <br>
        <strong>Email:</strong> ${student.email} <br>
        <strong>Course:</strong> ${student.courseName} <br>
      `,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  }

  // Đóng danh sách sinh viên
  closeStudentList(): void {
    this.selectedCourse = null;
    this.students = [];
  }

  // Phương thức áp dụng tìm kiếm
  applySearch(): void {
    this.filteredStudents = this.students.filter((student) => {
      const matchesName = this.searchName
        ? student.fullname.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const matchesEmail = this.searchEmail
        ? student.email.toLowerCase().includes(this.searchEmail.toLowerCase())
        : true;

      return matchesName && matchesEmail;
    });

    this.calculateTotalPages(); // Cập nhật lại tổng số trang sau khi lọc
    this.paginateStudents(); // Phân trang lại sau khi lọc
    console.log('Filtered students:', this.filteredStudents); // Debug log
  }

  // Phương thức trả về danh sách sinh viên đã lọc
  getFilteredStudents(): any[] {
    return this.filteredStudents;
  }
  viewStudents(course: Course): void {
    this.selectedCourse = course;
    this.students = course.students ? [...course.students] : [];
    this.filteredStudents = [...this.students]; 
    this.calculateTotalPages(); 
    this.paginateStudents();
  }
  
}
