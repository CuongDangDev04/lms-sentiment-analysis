import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';
import { count, firstValueFrom, forkJoin } from 'rxjs';
import { Review } from '../../interfaces/review';
import { Student } from '../../interfaces/student';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-detail-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-student.component.html',
  styleUrl: './detail-student.component.css',
})
export class DetailStudentComponent implements OnInit {
  isLoggedIn: boolean = true;
  studentLogin: any;
  showOverlay: boolean = false;
  courseId: string | null = null;
  courseDetail: any;
  reviews: Review[] = [];
  studentComment: any[] = [];
  comments: any[] = [];
  totalComment: number = 0;
  visibleComments: any[] = [];
  commentsPerPage = 3; // Số lượng bình luận hiển thị mỗi lần
  currentPage = 1;
  newComment: string = '';
  rating: number = 5; // Hoặc có thể lấy giá trị rating từ giao diện người dùng
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  showStickyBox = false;
  isMenuFixed = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
    });
    forkJoin({
      studentLogin: this.studentService.getStudentByUserId(321),
      courseDetail: this.courseService.getCourseById(Number(this.courseId)),
      reviews: this.courseService.getReviewOfCourse(Number(this.courseId)),
      students: this.studentService.getAllStudents(),
    }).subscribe(
      ({ courseDetail, reviews, students, studentLogin }) => {
        console.log('Reviews for courseId ' + this.courseId + ':', reviews);
        this.studentLogin = studentLogin;
        this.courseDetail = courseDetail;
        this.reviews = reviews;
        this.studentComment = students;
        this.updateCourseRatings();
        this.totalComment = this.reviews.length;
        console.log(this.studentComment);
        console.log('Đây là student đang login: ' + this.studentLogin);
        this.loadComments(); // Chỉ gọi loadComments sau khi tất cả dữ liệu đã được tải xong
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
    console.log(this.reviews);
  }

  updateCourseRatings(): void {
    if (Array.isArray(this.reviews)) {
      const courseReviews = this.reviews.filter(
        (review) => review.courseId === this.courseDetail.id
      );

      if (courseReviews.length > 0) {
        const totalRating = courseReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        this.courseDetail.rating = parseFloat(
          (totalRating / courseReviews.length).toFixed(1)
        );
      } else {
        this.courseDetail.rating = 0;
      }
    }
  }

  combineStudentReviews(
    students: Student[],
    reviews: Review[],
    courseId: number
  ) {
    // Lọc reviews theo courseId
    const courseReviews = reviews.filter(
      (review) => review.courseId === courseId
    );

    // Kết hợp thông tin của sinh viên với review
    return students
      .filter((student) =>
        courseReviews.some((review) => review.studentId === student.id)
      ) // Chỉ lấy sinh viên đã có review trong khóa học này
      .map((student) => {
        // Lấy tất cả review của sinh viên trong khóa học
        const studentReviews = courseReviews.filter(
          (review) => review.studentId === student.id
        );

        return {
          ...student, // Lấy tất cả thông tin của sinh viên
          reviews: studentReviews.map((r) => ({
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt,
          })),
        };
      });
  }
  loadComments(): void {
    const combinedData = this.combineStudentReviews(
      this.studentComment,
      this.reviews,
      Number(this.courseId)
    );
    this.visibleComments = combinedData.slice(0, this.commentsPerPage); // Lấy 3 bình luận đầu tiên
    this.comments = combinedData; // Lưu toàn bộ dữ liệu để load thêm sau này
  }

  loadMoreComments(): void {
    // Lấy thêm 3 bình luận nữa từ mảng `comments`
    const nextComments = this.comments.slice(
      this.visibleComments.length,
      this.visibleComments.length + this.commentsPerPage
    );
    this.visibleComments = [...this.visibleComments, ...nextComments]; // Cập nhật visibleComments
  }

  addComment() {
    if (!this.isLoggedIn) {
      this.errorMessage = 'Bạn phải đăng nhập để bình luận';
      return;
    }

    if (!this.newComment || this.newComment.trim() === '') {
      this.errorMessage = 'Vui lòng nhập bình luận';
      return;
    }

    const commentData = {
      //studentId: this.studentLogin.id,
      studentId: 3,
      courseId: this.courseId,
      //rating: this.rating,
      rating: 3,
      comment: this.newComment,
    };
    this.courseService.addComment(commentData).subscribe(
      (response) => {
        console.log('Bình luận thành công:', response);

        this.newComment = '';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Lỗi khi gửi bình luận:', error);
        this.errorMessage = 'Đã xảy ra lỗi khi thêm bình luận';
      }
    );
    window.location.reload();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const container = document.querySelector('.container-title');
    const containerBottom = container?.getBoundingClientRect().bottom || 0;
    this.isMenuFixed = containerBottom <= 0;
    // Hiển thị box-sticky nếu container-title đã cuộn qua khỏi màn hình
    this.showStickyBox = containerBottom <= 0;
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
