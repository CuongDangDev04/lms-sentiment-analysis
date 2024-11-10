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

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css',
})
export class DashboardStudentComponent implements OnInit {
  courseServices: CourseService = inject(CourseService);
  progressCurrent: number = 100; // Số giờ hoàn thành
  progressTotal: number = 173; // Tổng số giờ
  progressPercentage: number = 0; // Tỷ lệ phần trăm
  radius: number = 54; // Bán kính của vòng tròn
  circumference: number = 0; // Chu vi của vòng tròn

  reviews: Review[] = [];

  courses: Course[] = [];

  constructor() {
    this.reviews = this.courseServices.getAllReview();
    this.courses = this.courseServices.getAllCourse();
  }
  totalCourses: number = this.courses.length; // Tổng số khóa học
  index = 0;
  currentCourses: Course[] = [
    this.courses[0 + this.index],
    this.courses[1 + this.index],
    this.courses[2 + this.index],
  ];

  current_courses() {
    const startIndex = this.index;
    const endIndex = Math.min(this.courses.length, startIndex + 3); // Đảm bảo không vượt quá độ dài của mảng courses
    this.currentCourses = this.courses.slice(startIndex, endIndex);
  }
  getFullStars(rating: number): number[] {
    return new Array(Math.floor(rating)); // Sao đầy
  }

  getHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5; // Nếu có sao nửa
  }

  getEmptyStars(rating: number): number[] {
    return new Array(
      5 - Math.floor(rating) - (this.getHalfStar(rating) ? 1 : 0)
    ); // Sao rỗng
  }
  nextCourses() {
    if (this.index + 3 < this.totalCourses) {
      this.index += 3;
      console.log(this.index);
      this.current_courses();
      console.log(this.currentCourses);
    }
  }
  previousCourses() {
    if (this.index >= 3) {
      this.index -= 3;
      console.log(this.index);
      this.current_courses();
      console.log(this.currentCourses);
    }
  }
  ngOnInit(): void {
    this.courses = this.courseServices.getAllCourse(); // Đảm bảo courses được nạp lại
    this.totalCourses = this.courses.length; // Cập nhật tổng số khóa học
    this.current_courses(); // Khởi tạo lại danh sách khóa học hiển thị
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
    console.log(this.courses);
  }

  updateProgress(): void {
    this.progressPercentage = (this.progressCurrent / this.progressTotal) * 100;
  }
  profilePicture: string = 'assets/student/img/team-1.jpg';
  //tham chiếu đến thẻ <input type="file"> đã đánh dấu #fileInput trong HTML
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
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Cập nhật ảnh đại diện
      };

      reader.readAsDataURL(file);
    }
  }
}
