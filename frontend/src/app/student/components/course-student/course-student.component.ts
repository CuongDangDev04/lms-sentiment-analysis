import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../interfaces/course';
import { Review } from '../../interfaces/review';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css'],
})
export class CourseStudentComponent implements OnInit {
  courseService: CourseService = inject(CourseService);
  searchTerm: string = '';
  selectedCategory: string = 'all'; // 'all' để hiển thị tất cả các khóa học theo mặc định

  reviews: Review[] = [];

  courses: Course[] = [];

  constructor() {}
  filteredCourseList: Course[] = [];

  // Phân trang
  currentPage: number = 1;
  pageSize: number = 9;

  //Khởi tạo tất cả khóa học
  ngOnInit(): void {
    this.getAllCourses(); // Gọi API để lấy dữ liệu khóa học
  }

  // Khởi tạo tất cả khóa học
  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses; // Cập nhật courses sau khi lấy được dữ liệu từ API
        console.log(this.courses); // In ra dữ liệu sau khi đã gán
        this.updateCourseRatings(); // Cập nhật rating khóa học sau khi có danh sách
        this.applyFilter(); // Áp dụng bộ lọc nếu có
      },
      (error) => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu khóa học:', error); // Xử lý lỗi nếu có
      }
    );
  }

  // Phương thức lọc chung
  applyFilter(): void {
    this.filteredCourseList = this.courses.filter((course) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        course.category === this.selectedCategory;
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
  get paginatedCourses(): Course[] {
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
