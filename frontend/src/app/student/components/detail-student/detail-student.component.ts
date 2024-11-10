import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';
import { count } from 'rxjs';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-detail-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-student.component.html',
  styleUrl: './detail-student.component.css',
})
export class DetailStudentComponent implements OnInit {
  courseId: string | null = null;
  courseDetail: any;
  reviews: Review[] = [];
  totalComment: number = 0;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
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
