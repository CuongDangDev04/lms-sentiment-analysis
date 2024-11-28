import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';
import { count, firstValueFrom, forkJoin } from 'rxjs';
import { Review } from '../../interfaces/review';
import { Student } from '../../interfaces/student';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule, NumberValueAccessor } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import Swal from 'sweetalert2';
import { SentimentService } from '../../services/sentiment.service';

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
  coursesOfStudent: any;
  reviews: Review[] = [];
  studentComment: any[] = [];
  comments: any[] = [];
  totalComment: number = 0;
  visibleComments: any[] = [];
  commentsPerPage = 3; // Số lượng bình luận hiển thị mỗi lần
  currentPage = 1;
  newComment: string = '';
  updateCommentText: string = '';
  rating: number = 5; // Hoặc có thể lấy giá trị rating từ giao diện người dùng
  updateRatingNumber: number = 5;
  errorMessage: string = '';
  isRegistrationCourse: boolean = false;
  studentRegisterCourse: { students: any[] } = { students: [] };
  isEditing: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private studentService: StudentService,
    private sentimentService: SentimentService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  showStickyBox = false;
  isMenuFixed = false;

  async ngOnInit(): Promise<void> {
    try {
      this.route.paramMap.subscribe((params) => {
        this.courseId = params.get('id');
      });
      const {
        studentLogin,
        courseDetail,
        reviews,
        students,
        studentRegisterCourse,
      } = await firstValueFrom(
        forkJoin({
          studentLogin: this.authService.fetchUserInfo(),
          courseDetail: this.courseService.getCourseById(Number(this.courseId)),
          reviews: this.courseService.getReviewOfCourse(Number(this.courseId)),
          students: this.studentService.getAllStudents(),
          studentRegisterCourse: this.courseService.getStudentInCourse(
            Number(this.courseId)
          ),
        })
      );

      this.studentLogin = studentLogin;
      this.courseDetail = courseDetail;
      this.reviews = reviews;
      this.studentComment = students;
      this.totalComment = this.reviews.length;

      const studentRegister = studentRegisterCourse.students.find(
        (student: any) => student.id === studentLogin.id
      );
      this.isRegistrationCourse = !!studentRegister;
      this.updateCourseRatings();
      this.loadComments();
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
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
    const currentUserComment = combinedData.find(
      (comment) => comment.id === this.studentLogin.id
    );

    if (currentUserComment) {
      const otherComments = combinedData.filter(
        (comment) => comment.id !== this.studentLogin.id
      );
      this.visibleComments = [currentUserComment, ...otherComments];
    } else {
      this.visibleComments = combinedData.slice(0, this.commentsPerPage);
    }
    this.comments = combinedData;
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
    if (!this.newComment || this.newComment.trim() === '') {
      Swal.fire({
        title: 'Cảnh báo!',
        text: 'Vui lòng nhập bình luận',
        icon: 'warning',
        confirmButtonText: 'Đồng ý',
      });
    }

    this.courseService
      .isCourseRegistered(Number(this.courseId), this.studentLogin.id)
      .subscribe(
        (isRegistered) => {
          if (!isRegistered) {
            // Nếu sinh viên chưa đăng ký khóa học, sử dụng SweetAlert2
            Swal.fire({
              title: 'Cảnh báo!',
              text: 'Bạn chưa tham gia khóa học này nên ko thể bình luận',
              icon: 'warning',
              confirmButtonText: 'Đồng ý',
            });
            return;
          }

          // Nếu sinh viên đã đăng ký khóa học
          const commentData = {
            studentId: this.studentLogin.id,
            courseId: this.courseId,
            rating: this.rating,
            comment: this.newComment,
          };

          this.courseService.addComment(commentData).subscribe(
            (response) => {
              console.log('Bình luận thành công:', response);
              this.newComment = '';
              this.errorMessage = '';
              window.location.reload();
            },
            (error) => {
              console.error('Lỗi khi gửi bình luận:', error);
              this.errorMessage = 'Đã xảy ra lỗi khi thêm bình luận';
            }
          );
        },
        (error) => {
          console.error('Lỗi khi kiểm tra đăng ký khóa học:', error);
          this.errorMessage = 'Đã xảy ra lỗi khi kiểm tra đăng ký khóa học';
        }
      );
  }
  deleteComment(): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa bình luận này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService
          .deleteComment(Number(this.courseId), this.studentLogin.id)
          .subscribe(
            (response) => {
              Swal.fire('Đã xóa!', 'Bình luận đã bị xóa', 'success').then(
                () => {
                  window.location.reload();
                }
              );
            },
            (error) => {
              console.error('Lỗi khi xóa bình luận:', error);
              Swal.fire('Lỗi', 'Đã xảy ra lỗi khi xóa bình luận', 'error');
            }
          );
      }
    });
  }
  updateComment() {
    const commentData = {
      rating: this.updateRatingNumber,
      comment: this.updateCommentText,
    };
    this.courseService
      .updateComment(Number(this.courseId), this.studentLogin.id, commentData)
      .subscribe(
        (response) => {
          console.log('Sửa bình luận thành công:', response);
          this.enableEditMode();
          window.location.reload();
        },
        (error) => {
          console.error('Lỗi khi gửi bình luận:', error);
          this.errorMessage = 'Đã xảy ra lỗi khi thêm bình luận';
        }
      );
  }
  enableEditMode() {
    this.isEditing = !this.isEditing;
    this.updateRatingNumber = this.visibleComments[0].reviews[0].rating;
    this.updateCommentText = this.visibleComments[0].reviews[0].comment;
  }

  register() {
    const userId = this.studentLogin.id;
    const courseId = Number(this.courseId);

    this.courseService.isCourseRegistered(courseId, userId).subscribe({
      next: (isRegistered) => {
        console.log('asdasdasdasdasiodsad: ' + isRegistered);
        if (isRegistered) {
          Swal.fire({
            title: 'Thông báo',
            text: 'Bạn đã đăng ký khóa học này.',
            icon: 'info',
            confirmButtonText: 'OK',
          }).then(() => {
            location.reload();
          });
        } else {
          this.courseService.registerCourse(courseId, userId).subscribe({
            next: (response) => {
              Swal.fire({
                title: 'Đăng ký thành công!',
                text: 'Bạn đã đăng ký khóa học thành công.',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => {
                location.reload();
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Đăng ký thất bại',
                text: 'Đã xảy ra lỗi trong quá trình đăng ký khóa học. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonText: 'OK',
              }).then(() => {
                location.reload();
              });
            },
          });
        }
      },
      error: (error) => {
        console.error('Error checking registration status:', error);
        Swal.fire({
          title: 'Lỗi',
          text: 'Không thể kiểm tra trạng thái đăng ký. Vui lòng thử lại.',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then(() => {
          location.reload();
        });
      },
    });
  }

  setRating(rating: number): void {
    if (!this.isEditing) {
      this.rating = rating;
    } else {
      this.updateRatingNumber = rating;
    }
    console.log('rating: ', this.rating);
    console.log('update rating: ', this.updateRatingNumber);
  }

  updateRating() {
    const courseReviews = this.reviews.filter(
      (review) => review.courseId === this.courseDetail.id
    );
    const totalRating = courseReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    // Cập nhật rating trung bình
    if (courseReviews.length > 0) {
      this.courseDetail.rating = totalRating / courseReviews.length;
    } else {
      this.courseDetail.rating = 0; // Nếu không có review, set rating là 0
    }
    const data = {
      categoryId: this.courseDetail.categoryId,
      rating: this.courseDetail.rating,
    };
    this.courseService.updateCourse(Number(this.courseId), data).subscribe(
      (response) => {
        console.log('update thành công: ', response);
      },
      (error) => {
        console.error('Lỗi khi gửi bình luận: ', error);
      }
    );
  }
  getMySentimentAnalyze() {
    const myReview: any = this.reviews.find(
      (review) =>
        review.studentId === this.studentLogin.id &&
        review.courseId === Number(this.courseId)
    );
    if (myReview.isAnalyzed) {
      this.sentimentService
        .getSentimentAnalysisByCourseAndUser(
          Number(this.courseId),
          this.studentLogin.id
        )
        .subscribe((response) => {
          Swal.fire({
            title: 'Kết quả phân tích cảm xúc',
            html: `
              <strong>Bình luận:</strong> ${response[0].reviewText} <br />
              <strong>Điểm tích cực:</strong> ${response[0].sentimentScorePositive} <br />
              <strong>Điểm tiêu cực:</strong> ${response[0].sentimentScoreNegative} <br />
              <strong>Điểm trung tính:</strong> ${response[0].sentimentScoreNeutral} <br />
              <strong>Cảm xúc:</strong> ${response[0].sentimentLabel} <br />
              
          `,
            icon: 'info',
            confirmButtonText: 'Đồng ý',
          });
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
