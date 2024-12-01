import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../interfaces/course';
import { Review } from '../../interfaces/review';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, forkJoin } from 'rxjs';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-course-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css'],
})
export class CourseStudentComponent implements OnInit {
  courseService: CourseService = inject(CourseService);
  searchTerm: string = '';
  selectedCategory: string = 'all'; // 'all' để hiển thị tất cả các khóa học theo mặc định
  category_all: string[] = [];

  reviews: Review[] = [];

  courses: any[] = [];

  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute
  ) {}
  filteredCourseList: Course[] = [];

  // Phân trang
  currentPage: number = 1;
  pageSize: number = 9;

  //Khởi tạo tất cả khóa học
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || 'all'; // Lấy searchTerm từ queryParams
      this.getAllCourses(); // Lấy dữ liệu khóa học và áp dụng bộ lọc
    });
  }

  // Khởi tạo tất cả khóa học
  // getAllCourses(): void {
  //   forkJoin({
  //     courses: this.courseService.getAllCourses(),
  //     reviews: this.courseService.getAllReview().pipe(
  //       catchError((error) => {
  //         if (error.status === 404) {
  //           console.error('Không tìm thấy review');
  //           return []; // Trả về một mảng rỗng nếu API trả về 404
  //         }
  //         return []; // Xử lý các lỗi khác và trả về một mảng rỗng
  //       })
  //     ),
  //     instructors: this.instructorService.getAllInstructor(),
  //     categories: this.courseService.getAllCategories(),
  //   }).subscribe(
  //     ({ courses, reviews, instructors, categories }) => {
  //       // this.courses = courses; // Cập nhật khóa học
  //       this.reviews = reviews; // Lưu thông tin khác.
  //       this.courses = courses;
  //       if (this.reviews) {
  //         this.updateCourseRatings();
  //       } // Cập nhật rating khóa học
  //       this.applyFilter(); // Áp dụng bộ lọc
  //       // Xử lý dữ liệu khác nếu cần
  //     },
  //     (error) => {
  //       console.error('Có lỗi xảy ra khi lấy dữ liệu:', error); // Xử lý lỗi
  //     }
  //   );
  // }

  getAllCourses(): void {
    forkJoin({
      courses: this.courseService.getAllCourses(),
      reviews: this.courseService.getAllReview(),
      categories: this.courseService.getAllCategories(),
    }).subscribe(
      ({ courses, reviews, categories }) => {
        this.reviews = reviews;
        this.courses = courses;
        this.category_all = categories.map((category) => category.name);
        this.updateCourseRatings();
        this.applyFilter(); // Áp dụng bộ lọc
      },
      (error) => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error); // Xử lý lỗi
      }
    );
  }

  applyFilter(): void {
    this.filteredCourseList = this.courses.filter((course) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        course.category.name === this.selectedCategory;
      const matchesSearchTerm = course.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
    this.currentPage = 1; // Đặt lại trang hiện tại khi thay đổi bộ lọc
  }

  // Rating
  updateCourseRatings(): void {
    // Tính toán rating trung bình cho từng khóa học
    this.courses.forEach((course) => {
      // Lọc các reviews của khóa học này
      const courseReviews = this.reviews.filter(
        (review) => review.courseId === course.id
      );

      // Tính tổng rating
      const totalRating = courseReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );

      // Cập nhật rating trung bình
      if (courseReviews.length > 0) {
        course.rating = totalRating / courseReviews.length;
      } else {
        course.rating = 0; // Nếu không có review, set rating là 0
      }
      const data = {
        categoryId: course.categoryId,
        rating: course.rating,
      };
      this.courseService.updateCourse(course.id, data).subscribe(
        (response) => {},
        (error) => {
          console.error('Lỗi khi gửi bình luận: ', error);
        }
      );
    });
  }
  getFullStars(rating: number): number[] {
    return new Array(Math.floor(rating)); // Trả về số sao đầy đủ
  }

  getHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5; // Nếu phần thập phân >= 0.5 thì hiển thị sao nửa
  }

  getEmptyStars(rating: number): number[] {
    const fullStars = Math.floor(rating); // Lấy số sao đầy
    const halfStar = this.getHalfStar(rating) ? 1 : 0; // Nếu có sao nửa, trả về 1, nếu không trả về 0
    return new Array(5 - fullStars - halfStar); // Trả về số sao rỗng (5 sao - sao đầy - sao nửa)
  }
  // Các phương thức phân trang
  get paginatedCourses(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    window.scrollTo(0, 0);

    return this.filteredCourseList.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCourseList.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
