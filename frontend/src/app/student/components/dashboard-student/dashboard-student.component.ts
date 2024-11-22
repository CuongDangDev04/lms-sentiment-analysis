import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Course } from '../../interfaces/course';
import { CommonModule } from '@angular/common';
import { Review } from '../../interfaces/review';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../../auth/auth.service';
import { forkJoin } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css',
})
export class DashboardStudentComponent implements OnInit {
  courseService: CourseService = inject(CourseService);
  authService: AuthService = inject(AuthService);
  studentService: StudentService = inject(StudentService);

  progressCurrent: number = 59;
  progressTotal: number = 173;
  progressPercentage: number = 0;
  radius: number = 54;
  circumference: number = 0;

  reviews: Review[] = [];
  courses: Course[] = [];
  studentLogin: any;
  index: number = 0;
  currentCourses: Course[] = [];
  totalCourses: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Lấy thông tin sinh viên và các khóa học, đánh giá song song bằng forkJoin
    forkJoin([
      this.authService.fetchUserInfo(),
      this.courseService.getAllReview(),
    ]).subscribe(
      ([user, reviews]) => {
        // Gán dữ liệu trả về từ fetchUserInfo và getAllReview
        this.studentLogin = user;
        this.reviews = reviews;
        this.getAllCourses();
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }

  // Lấy khóa học của sinh viên
  getAllCourses(): void {
    this.courseService.getCoursesOfStudent(this.studentLogin.id).subscribe(
      (courses) => {
        this.courses = courses;
        this.totalCourses = this.courses.length;
        this.current_courses(); // Cập nhật lại danh sách khóa học hiển thị
        console.log('Courses:', this.courses);
        this.circumference = 2 * Math.PI * this.radius;
        this.totalProgress();
        this.updateProgress();
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Cập nhật danh sách khóa học hiện tại
  current_courses() {
    const startIndex = this.index;
    const endIndex = Math.min(this.courses.length, startIndex + 3); // Đảm bảo không vượt quá độ dài của mảng courses
    this.currentCourses = this.courses.slice(startIndex, endIndex);
  }

  // Hàm chuyển đến khóa học tiếp theo
  nextCourses() {
    if (this.index + 3 < this.totalCourses) {
      this.index += 3;
      this.current_courses();
    }
  }

  // Hàm quay lại khóa học trước
  previousCourses() {
    if (this.index >= 3) {
      this.index -= 3;
      this.current_courses();
    }
  }
  totalProgress() {
    this.progressTotal = this.courses.reduce(
      (sum, course) => sum + course.number_of_lessons,
      0
    );
  }
  // Cập nhật tỷ lệ hoàn thành
  updateProgress(): void {
    this.progressPercentage = (this.progressCurrent / this.progressTotal) * 100;
  }
  // Lấy số sao đầy
  getFullStars(rating: number): number[] {
    return new Array(Math.floor(rating));
  }

  // Kiểm tra sao nửa
  getHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  // Lấy số sao rỗng
  getEmptyStars(rating: number): number[] {
    return new Array(
      5 - Math.floor(rating) - (this.getHalfStar(rating) ? 1 : 0)
    );
  }

  // Quản lý ảnh đại diện
  profilePicture: string = 'assets/student/img/team-1.jpg';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  // Kích hoạt input file khi click vào ảnh
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Hàm xử lý khi người dùng chọn ảnh mới
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const data = { avt: `../../../../assets/student/img/${file.name}` };
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Cập nhật ảnh đại diện
        const avt = data;
        this.studentService
          .updateStudent(this.studentLogin.id, avt)
          .subscribe();
      };

      reader.readAsDataURL(file);
    }
    window.location.reload();
  }
}
