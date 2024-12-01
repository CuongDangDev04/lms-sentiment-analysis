import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sentiment-analysis-instructor',
  standalone: true,
  templateUrl: './sentiment-analysis-instructor.component.html',
  styleUrls: ['./sentiment-analysis-instructor.component.css'],
  imports: [CommonModule],
})
export class SentimentAnalysisInstructorComponent implements OnInit {
  instructorId = ''; // Thay bằng ID instructor thực tế
  sentimentAverages: { 
    courseName: string; 
    avgPositive: number; 
    avgNegative: number; 
    avgNeutral: number; 
  }[] = [];
  errorMessage: string | null = null;
  chart: Chart | null = null; // Để lưu biểu đồ đã tạo

  constructor(private courseService: CourseService, private authService: AuthService) {
    Chart.register(...registerables); // Đăng ký các thành phần Chart.js
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }
    this.getSentimentAnalysis();
  }

  getSentimentAnalysis(): void {
    this.courseService.getAllReviewsByInstructor(this.instructorId).subscribe({
      next: (reviews) => {
        const courseScores: { [key: string]: { positive: number[]; negative: number[]; neutral: number[] } } = {};

        // Gom nhóm dữ liệu theo khóa học
        reviews.forEach((review: any) => {
          const courseName = review.course.name;
          const sentiment = review.sentimentAnalysis;

          if (!courseScores[courseName]) {
            courseScores[courseName] = { positive: [], negative: [], neutral: [] };
          }

          courseScores[courseName].positive.push(sentiment.sentimentScorePositive);
          courseScores[courseName].negative.push(sentiment.sentimentScoreNegative);
          courseScores[courseName].neutral.push(sentiment.sentimentScoreNeutral);
        });

        // Tính trung bình từng khóa học
        this.sentimentAverages = Object.keys(courseScores).map((courseName) => {
          const scores = courseScores[courseName];
          const avgPositive = this.calculateAverage(scores.positive);
          const avgNegative = this.calculateAverage(scores.negative);
          const avgNeutral = this.calculateAverage(scores.neutral);

          return { courseName, avgPositive, avgNegative, avgNeutral };
        });

        // Vẽ biểu đồ sau khi tính toán xong
        this.renderChart();
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch sentiment analysis data.';
        console.error(error);
      },
    });
  }

  calculateAverage(scores: number[]): number {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score, 0);
    return parseFloat((total / scores.length).toFixed(3)); // Giới hạn 3 số thập phân
  }

  renderChart(): void {
    const canvas = document.getElementById('sentiment-chart') as HTMLCanvasElement;

    if (canvas) {
      // Xóa biểu đồ cũ nếu tồn tại
      if (this.chart) {
        this.chart.destroy();
      }

      // Chuẩn bị dữ liệu cho biểu đồ
      const labels = this.sentimentAverages.map((data) => data.courseName);
      const avgPositives = this.sentimentAverages.map((data) => data.avgPositive);
      const avgNegatives = this.sentimentAverages.map((data) => data.avgNegative);
      const avgNeutrals = this.sentimentAverages.map((data) => data.avgNeutral);

      // Tạo biểu đồ
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels, // Tên các khóa học
          datasets: [
            {
              label: 'Điểm tích cực',
              data: avgPositives,
              backgroundColor: '#4caf50',
            },
            {
              label: 'Điểm tiêu cực',
              data: avgNegatives,
              backgroundColor: '#f44336',
            },
            {
              label: 'Điểm trung tính',
              data: avgNeutrals,
              backgroundColor: '#ffeb3b',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Biểu đồ phân tích tình cảm trung bình cho các khóa học giảng viên giảng dạy',
            },
          },
          scales: {
            x: {
              stacked: false,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Canvas element not found for sentiment chart.');
    }
  }
}
