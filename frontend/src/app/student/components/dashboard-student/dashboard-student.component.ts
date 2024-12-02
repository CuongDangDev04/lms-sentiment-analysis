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
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css',
})
export class DashboardStudentComponent implements OnInit {
  @ViewChild('comment-container') commentContainer!: ElementRef;
  topValue: number = 28;
  courseService: CourseService = inject(CourseService);
  authService: AuthService = inject(AuthService);
  studentService: StudentService = inject(StudentService);
  instructorService: InstructorService = inject(InstructorService);
  progressCurrent: number = 173;
  progressTotal: number = 173;
  progressPercentage: number = 0;
  radius: number = 54;
  circumference: number = 0;

  reviews: Review[] = [];
  courses: any[] = [];
  studentLogin: any;
  index: number = 0;
  currentCourses: Course[] = [];
  totalCourses: number = 0;
  instructors: any[] = [];
  totalComment: Number = 0;
  isShowComment: boolean = false;
  userComments: any[] = [];
  sentimentAnalysis: any;
  profilePicture: string = 'assets/student/img/team-1.jpg';
  constructor(private router: Router) {}

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
        this.studentService
          .checkFileExists(this.studentLogin.avt)
          .subscribe((exists) => {
            if (this.isBase64Image(this.studentLogin.avt)) {
            } else if (!exists) {
              this.studentLogin.avt = '../../../../assets/user.png';
            }
            this.profilePicture = this.studentLogin.avt;
          });
        this.getAllCourses();

        this.getTotalComments();
        this.getUserComments();
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

        this.current_courses();
        this.circumference = 2 * Math.PI * this.radius;
        this.totalProgress();
        this.updateProgress();
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  getTotalComments(): void {
    if (!this.studentLogin || !this.studentLogin.id || !this.reviews.length) {
      this.totalComment = 0;
      return;
    }

    const userComments = this.reviews.filter(
      (review) => review.studentId === this.studentLogin.id
    );

    this.totalComment = userComments.length;
  }
  current_courses() {
    this.instructorService.getAllInstructor().subscribe((instructors) => {
      const instructorMap = new Map(
        instructors.map((instructor) => [instructor.id, instructor.fullname])
      );

      const studentCountRequests = this.courses.map((course) =>
        this.courseService.getStudentInCourse(course.id)
      );

      forkJoin(studentCountRequests).subscribe((studentCounts) => {
        this.courses = this.courses.map((course, index) => {
          course.instructorName =
            instructorMap.get(course.instructorId) || 'Không xác định';
          course.number_of_students =
            studentCounts[index]?.students.length || 0;
          return course;
        });

        // Chia nhỏ danh sách khóa học hiển thị
        const startIndex = this.index;
        const endIndex = Math.min(this.courses.length, startIndex + 3); // Đảm bảo không vượt quá độ dài của mảng courses
        this.currentCourses = this.courses.slice(startIndex, endIndex);
      });
    });
  }

  showSentimentAnalysis(courseId: any) {
    const findReview: any = this.reviews.find(
      (review) => review.courseId === Number(courseId)
    );
    this.sentimentAnalysis = findReview.sentimentAnalysis;
    if (findReview.isAnalyzed) {
      Swal.fire({
        title: 'Kết quả phân tích cảm xúc',
        html: `
        <table style="width: 100%; text-align: left; font-size: 14px;">
      <tr>
        <td style="font-weight: bold; padding-right: 10px;">Bình luận:</td>
        <td style="
          max-width: 200px; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis;"
          title="${this.sentimentAnalysis.reviewText}"
        >${this.sentimentAnalysis.reviewText}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding-right: 10px;">Điểm tích cực:</td>
        <td>${this.sentimentAnalysis.sentimentScorePositive}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding-right: 10px;">Điểm tiêu cực:</td>
        <td>${this.sentimentAnalysis.sentimentScoreNegative}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding-right: 10px;">Điểm trung tính:</td>
        <td>${this.sentimentAnalysis.sentimentScoreNeutral}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding-right: 10px;">Cảm xúc:</td>
        <td>${this.sentimentAnalysis.sentimentLabel}</td>
      </tr>
    </table>
    `,
        icon: 'info',
        confirmButtonText: 'Đồng ý',
      });
    } else {
      Swal.fire({
        title: 'Kết quả phân tích cảm xúc',
        text: 'Bình luận của bạn chưa được phân tích',
        icon: 'warning',
        confirmButtonText: 'Đồng ý',
      }).then(() => {
        window.location.reload();
      });
    }
  }
  nextCourses() {
    if (this.index + 3 < this.totalCourses) {
      this.index += 3;
      this.current_courses();
    }
  }
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
        this.profilePicture = e.target.result; // Cập nhật ảnh đại diện ngay lập tức khi file được chọn
        this.studentService
          .updateStudent(this.studentLogin.id, { avt: this.profilePicture })
          .subscribe(
            (response) => {},
            (error) => {
              console.error('There was an error!', error);
            }
          );
      };

      reader.readAsDataURL(file);
    }
    window.location.reload();
  }
  isBase64Image(str: string): boolean {
    const base64Pattern =
      /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/;
    return base64Pattern.test(str);
  }
  changeShowCommentStatus() {
    this.isShowComment = !this.isShowComment;
    this.calculateTopValue();
  }
  getUserComments(): void {
    if (!this.studentLogin || !this.reviews.length) {
      this.userComments = []; // Nếu không có dữ liệu
      return;
    }
    this.userComments = this.reviews.filter(
      (review) => review.studentId === this.studentLogin.id
    );
  }
  goToCourse(courseId: number): void {
    this.router.navigate(['/student/courses', courseId]);
  }

  calculateTopValue(): void {
    const containerHeight =
      this.commentContainer?.nativeElement.offsetHeight || 0;
    const numComments = this.userComments.length;

    if (!this.isShowComment) {
      this.topValue = 28;
    } else if (numComments === 0) {
      this.topValue = 23.5;
    } else if (numComments === 1) {
      this.topValue = 21.55;
    } else if (numComments === 2) {
      this.topValue = 19.2;
    } else if (numComments === 3) {
      this.topValue = 17.3;
    } else if (numComments > 3) {
      this.topValue = 17.14;
    }
  }
}
