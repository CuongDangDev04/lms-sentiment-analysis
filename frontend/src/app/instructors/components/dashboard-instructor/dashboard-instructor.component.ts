import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { SentimentAnalysisInstructorComponent } from "../sentiment-analysis-instructor/sentiment-analysis-instructor.component";

@Component({
  selector: 'app-dashboard-instructor',
  standalone: true,
  imports: [CommonModule, SentimentAnalysisInstructorComponent],
  templateUrl: './dashboard-instructor.component.html',
  styleUrls: ['./dashboard-instructor.component.css']
})
export class DashboardInstructorComponent implements OnInit {
  stats: any = null;
  instructorId: string = '2'; // Thay bằng instructorId thực tế của bạn

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
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
