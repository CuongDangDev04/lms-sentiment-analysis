import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';

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
    });
    console.log(this.courseDetail);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const container = document.querySelector('.container-title');
    const containerBottom = container?.getBoundingClientRect().bottom || 0;
    this.isMenuFixed = containerBottom <= 0;
    // Hiển thị box-sticky nếu container-title đã cuộn qua khỏi màn hình
    this.showStickyBox = containerBottom <= 0;
  }
}
