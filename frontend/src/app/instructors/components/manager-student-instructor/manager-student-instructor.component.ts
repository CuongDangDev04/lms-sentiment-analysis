import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../interfaces/course'; // Import the Course interface
import { AuthService } from '../../../auth/auth.service'; // Import AuthService
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
  courses: Course[] = []; // List of courses
  students: any[] = []; // List of students (flattened)
  isLoading: boolean = true; // Loading state
  errorMessage: string = ''; // Error message
  searchName: string = ''; // Search keyword for student name
  searchEmail: string = ''; // Search keyword for student email
  selectedCourse: Course | null = null; // Selected course
  instructorId: string = ''; // Instructor ID from AuthService
  filteredStudents: any[] = []; // Lưu danh sách sinh viên đã lọc

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }

    this.fetchCourses(); 
    this.filteredStudents = [...this.students];
  }

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
  
  viewStudentsInCourse(course: Course): void {
    this.selectedCourse = course;
    this.fetchStudentsFromCourse(course);
  }

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
  }



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

  viewStudents(course: Course): void {
    this.selectedCourse = course;
    this.students = course.students || [];
    this.filteredStudents = [...this.students]; // Đồng bộ danh sách đã lọc
  }
  

  closeStudentList(): void {
    this.selectedCourse = null;
    this.students = [];
  }

  // Phương thức áp dụng tìm kiếm
  applySearch(): void {
    // Chỉ thực hiện lọc khi nhấn nút Tìm kiếm
    this.filteredStudents = this.students.filter((student) => {
      const matchesName = this.searchName
        ? student.fullname.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
  
      const matchesEmail = this.searchEmail
        ? student.email.toLowerCase().includes(this.searchEmail.toLowerCase())
        : true;
  
      return matchesName && matchesEmail;
    });
  
    console.log('Filtered students:', this.filteredStudents); // Debug log
  }
  
  // Phương thức trả về danh sách sinh viên đã lọc
  getFilteredStudents(): any[] {
    return this.filteredStudents;
  }
  
  

  }