import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';
import { count } from 'rxjs';
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
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  showStickyBox = false;
  isMenuFixed = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
      if (this.courseId) {
        // Gọi dịch vụ để lấy chi tiết khóa học
        this.courseDetail = this.courseService.getCourseById(
          Number(this.courseId)
        );
      }
      const review = this.courseService.getReviewById(Number(this.courseId));
      if (review) {
        // Thực hiện hành động nếu tìm thấy review
        this.totalComment = review.length;
        this.reviews = review;
      }
    });

    this.updateCourseRatings();
    this.studentService.getAllStudents().subscribe(
      (students: Student[]) => {
        this.studentComment = students; // Lưu dữ liệu sinh viên vào studentComment
        this.loadComments(); // Sau khi nhận được dữ liệu sinh viên, load comments
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
    //Đăng nhập
    //this.isLoggedIn = this.authService.isLoggedIn();
  }
  addComment(): void {
    console.log('LOGIN' + this.isLoggedIn);

    // Kiểm tra người dùng có đăng nhập chưa
    if (!this.isLoggedIn) {
      this.showOverlay = true;
      return; // Ngừng hành động nếu chưa đăng nhập
    }

    if (!this.newComment || this.newComment.trim() === '') {
      console.log('Vui lòng nhập bình luận');
      return;
    }

    const currentUser: any = {
      id: 100,
      name: 'Nguyễn Đại Nam',
      avt: '../../../../assets/student/img/team-1.jpg',
    };

    const newReview = {
      id: currentUser.id,
      courseId: Number(this.courseId),
      rating: 5,
      comment: this.newComment,
      createdAt: new Date(),
    };

    this.courseService.addReview(newReview);

    this.reviews.push(newReview);
    this.totalComment = this.reviews.length;

    // Đặt lại giá trị bình luận sau khi thêm
    this.newComment = '';
    console.log(this.comments);
    this.visibleComments = this.comments;
  }

  updateCourseRatings(): void {
    const courseReviews = this.reviews.filter(
      (review) => review.courseId === this.courseDetail.id
    );

    const totalRating = courseReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    if (courseReviews.length > 0) {
      this.courseDetail.rating = parseFloat(
        (totalRating / courseReviews.length).toFixed(1)
      );
    } else {
      this.courseDetail.rating = 0; // Nếu không có review, set rating là 0
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
        courseReviews.some((review) => review.id === student.id)
      ) // Chỉ lấy sinh viên đã có review trong khóa học này
      .map((student) => {
        // Lấy tất cả review của sinh viên trong khóa học
        const studentReviews = courseReviews.filter(
          (review) => review.id === student.id
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