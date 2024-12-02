import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { ReviewService } from '../../services/review.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css',
})
export class HomeStudentComponent implements OnInit {
  category_top1: any;
  category_top2: any;
  category_top3: any;
  category_top4: any;
  popularCourses: any[] = [];

  myTeam: any[] = [
    {
      id: '2200002525',
      name: 'Nguyễn Đại Nam',
      avt: '../../../../assets/student/img/team-1.jpg',
      fb: 'https://www.facebook.com/dainam159',
    },
    {
      id: '2200000447',
      name: 'Đặng Trần Quốc Cường',
      avt: '../../../../assets/student/img/team-2.jpg',
      fb: 'https://www.facebook.com/BlueSkyDev04',
    },
  ];

  constructor(
    private courseService: CourseService,
    private reviewService: ReviewService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    forkJoin({
      course: this.courseService.getAllCourses(),
      categories: this.categoryService.getAllCategory(),
    }).subscribe(
      ({ categories, course }) => {
        // Xử lý cho category_top1
        this.categoryService
          .getCourseOfCategory(categories[0].id)
          .pipe(map((courses: any[]) => courses.length))
          .subscribe((count) => {
            this.category_top1 = {
              ...categories[0],
              count: count,
            };
          });

        // Xử lý cho category_top2
        this.categoryService
          .getCourseOfCategory(categories[1].id)
          .pipe(map((courses: any[]) => courses.length))
          .subscribe((count) => {
            this.category_top2 = {
              ...categories[1],
              count: count,
            };
          });

        // Xử lý cho category_top3
        this.categoryService
          .getCourseOfCategory(categories[2].id)
          .pipe(map((courses: any[]) => courses.length))
          .subscribe((count) => {
            this.category_top3 = {
              ...categories[2],
              count: count,
            };
          });

        // Xử lý cho category_top4
        this.categoryService
          .getCourseOfCategory(categories[3].id)
          .pipe(map((courses: any[]) => courses.length))
          .subscribe((count) => {
            this.category_top4 = {
              ...categories[3],
              count: count,
            };
          });

        this.popularCourses = course
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        // Sử dụng forkJoin để lấy số lượng sinh viên cho từng khóa học trong popularCourses
        const studentCountRequests = this.popularCourses.map((course) =>
          this.courseService.getStudentInCourse(course.id).pipe(
            catchError((error) => {
              console.error(
                `Lỗi khi lấy số lượng sinh viên cho khóa học ${course.id}:`,
                error
              );
              return of({ students: [] }); // Nếu có lỗi, trả về mảng sinh viên rỗng
            })
          )
        );

        // Khi tất cả các yêu cầu lấy số lượng sinh viên hoàn thành
        forkJoin(studentCountRequests).subscribe((studentsResponses) => {
          studentsResponses.forEach((response, index) => {
            this.popularCourses[index].number_of_students =
              response.students.length;
          });
        });
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Di chuyển mượt mà
    });
  }
}
