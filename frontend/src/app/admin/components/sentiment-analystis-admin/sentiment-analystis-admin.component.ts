import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Review, SentimentScore } from '../../interfaces/Analys';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sentiment-analystis-admin',
  templateUrl: './sentiment-analystis-admin.component.html',
  styleUrls: ['./sentiment-analystis-admin.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class SentimentAnalystisAdminComponent implements OnInit, AfterViewInit {
  reviews: Review[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  averageSentimentScores: SentimentScore[] = [];
  charts: { [courseId: string]: Chart } = {}; // Lưu trữ các biểu đồ theo courseId

  constructor(private feedbackService: FeedbackService) {
    Chart.register(...registerables); // Đăng ký các thành phần của Chart.js
  }

  ngOnInit(): void {
    this.fetchSentimentAnalysisData();
  }

  ngAfterViewInit(): void {
    // Đợi dữ liệu xong rồi mới tạo biểu đồ
  }

  fetchSentimentAnalysisData(): void {
    this.isLoading = true;

    this.feedbackService.getAllSentimentAnalysis().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
        this.calculateAverageSentimentScores();
        this.createCharts(); // Tạo biểu đồ sau khi tính toán xong
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Có lỗi khi lấy dữ liệu phân tích cảm xúc!';
        this.isLoading = false;
        console.error('Error fetching sentiment data: ', error);
      }
    });
  }

  calculateAverageSentimentScores(): void {
    const sentimentScores: { [courseId: string]: { positive: number, negative: number, neutral: number, count: number } } = {};

    this.reviews.forEach(review => {
      const courseId = review.courseId;

      if (!sentimentScores[courseId]) {
        sentimentScores[courseId] = {
          positive: 0,
          negative: 0,
          neutral: 0,
          count: 0
        };
      }

      sentimentScores[courseId].positive += review.sentimentScorePositive;
      sentimentScores[courseId].negative += review.sentimentScoreNegative;
      sentimentScores[courseId].neutral += review.sentimentScoreNeutral || 0;
      sentimentScores[courseId].count++;
    });

    this.averageSentimentScores = Object.keys(sentimentScores).map(courseId => {
      const scores = sentimentScores[courseId];
      return {
        courseId,
        avgPositive: scores.positive / scores.count,
        avgNegative: scores.negative / scores.count,
        avgNeutral: scores.neutral / scores.count
      };
    });
  }

  createCharts(): void {
  setTimeout(() => {
    const canvas = document.getElementById('combined-chart') as HTMLCanvasElement;

    if (canvas) {
      // Xóa biểu đồ cũ nếu tồn tại
      if (this.charts['combined']) {
        this.charts['combined'].destroy();
      }

      // Chuẩn bị dữ liệu cho từng loại cảm xúc
      const labels = this.averageSentimentScores.map(score => `Course ${score.courseId}`);
      const avgPositives = this.averageSentimentScores.map(score => score.avgPositive);
      const avgNegatives = this.averageSentimentScores.map(score => score.avgNegative);
      const avgNeutrals = this.averageSentimentScores.map(score => score.avgNeutral);

      // Tạo biểu đồ tổng hợp
      this.charts['combined'] = new Chart(canvas, {
        type: 'bar',
        data: {
          labels, // Mỗi course là một nhãn
          datasets: [
            {
              label: 'Avg Positive',
              data: avgPositives,
              backgroundColor: '#4caf50' // Màu xanh lá cho điểm tích cực
            },
            {
              label: 'Avg Negative',
              data: avgNegatives,
              backgroundColor: '#f44336' // Màu đỏ cho điểm tiêu cực
            },
            {
              label: 'Avg Neutral',
              data: avgNeutrals,
              backgroundColor: '#ffeb3b' // Màu vàng cho điểm trung tính
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' // Hiển thị chú thích ở trên
            },
            title: {
              display: true,
              text: 'Sentiment Analysis Across Courses'
            }
          },
          scales: {
            x: {
              stacked: false // Không gộp cột, hiển thị dạng nhóm
            },
            y: {
              beginAtZero: true // Bắt đầu từ 0
            }
          }
        }
      });
    } else {
      console.error('Canvas not found for combined chart');
    }
  }, 0);
}

  
}
