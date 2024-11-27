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
    // Retrieve instructorId from AuthService if the user is an instructor
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }

    this.fetchCourses(); // Fetch courses on component initialization
  }

  // Fetch the courses for the instructor
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

        // Calculate the number of students for each course
        this.courses.forEach(course => {
          course.studentsCount = course.students ? course.students.length : 0;
        });

        // Log the fetched courses for debugging
        console.log('Fetched courses:', this.courses);
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    );
  }
  
  // View students in the selected course
  viewStudentsInCourse(course: Course): void {
    this.selectedCourse = course;
    this.fetchStudentsFromCourse(course);
  }

  // Flatten students list from selected course
  fetchStudentsFromCourse(course: Course): void {
    if (!course || !Array.isArray(course.students)) {
      console.warn('No students found in course:', course);
      return;
    }

    // Flatten the student data by adding course name
    const flattenedStudents = course.students.map(student => ({
      ...student,
      courseName: course.name
    }));

    this.students = flattenedStudents; // Assign the flattened list to students
  }

  // Filter students based on search criteria (name and email)
  getFilteredStudents(): any[] {
    return this.students.filter((student) =>
      student.fullname.toLowerCase().includes(this.searchName.toLowerCase()) &&
      student.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }

  // Show student details in a SweetAlert
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

  // View students list of a specific course
  viewStudents(course: Course): void {
    this.selectedCourse = course;
    this.students = course.students || []; // Set students from selected course
  }

  // Close the student list and go back to the course list
  closeStudentList(): void {
    this.selectedCourse = null;
    this.students = [];
  }

  // Apply search filter to the students
  // Phương thức áp dụng tìm kiếm
applySearch(): void {
  // Lọc sinh viên khi người dùng nhấn vào nút tìm kiếm
  if (this.selectedCourse) {
    this.fetchStudentsFromCourse(this.selectedCourse);
  }

  }}