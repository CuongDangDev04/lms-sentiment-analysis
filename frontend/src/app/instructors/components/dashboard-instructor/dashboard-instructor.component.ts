import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { SentimentAnalysisInstructorComponent } from "../sentiment-analysis-instructor/sentiment-analysis-instructor.component";
import { SentimentAnalystisAdminComponent } from "../../../admin/components/sentiment-analystis-admin/sentiment-analystis-admin.component";
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard-instructor',
  standalone: true,
  imports: [CommonModule, SentimentAnalysisInstructorComponent],
  templateUrl: './dashboard-instructor.component.html',
  styleUrls: ['./dashboard-instructor.component.css']
})
export class DashboardInstructorComponent implements OnInit {
  stats: any = {
    totalCourses: 0,
    totalStudents: 0,
    totalReviews: 0,
    averageRating: 0,
  };
  instructorId: string = ''; // Thay bằng instructorId thực tế của bạn

  constructor(private courseService: CourseService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }

    this.courseService.getCompleteStats(this.instructorId).subscribe(
      (data) => {
        console.log('Dữ liệu trả về: ', data); // In ra dữ liệu trả về từ API
        this.stats = data;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }
}
