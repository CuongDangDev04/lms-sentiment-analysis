import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SentimentAnalystisAdminComponent } from "../sentiment-analystis-admin/sentiment-analystis-admin.component";
import { ManagerUsersAdminComponent } from "../manager-users-admin/manager-users-admin.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  imports: [SentimentAnalystisAdminComponent, ManagerUsersAdminComponent]
})
export class DashboardAdminComponent implements OnInit {
  @ViewChild('sentimentChart', { static: false }) sentimentChartRef!: ElementRef;

  stats = {
    users: 150,
    feedbacks: 75,
    courses: 20,
    sentimentAnalysis: 5 // Mức độ phân tích tình cảm (ví dụ: điểm số hoặc xếp loại)
  };

  constructor() {
    // Đăng ký các phần tử Chart.js (dùng để tạo biểu đồ)
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Đợi đến khi phần tử được khởi tạo, sau đó gọi phương thức vẽ biểu đồ
    setTimeout(() => this.initSentimentChart(), 0);
  }

  initSentimentChart(): void {
    // Kiểm tra xem phần tử canvas đã sẵn sàng hay chưa
    if (this.sentimentChartRef?.nativeElement) {
      const ctx = this.sentimentChartRef.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar', // Loại biểu đồ: 'pie'
        data: {
          labels: ['Khóa học 1', 'Khóa học 2', 'Khóa học 3', 'Khóa học 4', 'Khóa học 5'], // Các nhãn cho các phần pie chart
          datasets: [{
            label: 'Phân tích tình cảm',
            data: [75, 80, 65, 90, 85], // Dữ liệu (tỷ lệ % cảm xúc tích cực)
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33A1FF'], // Màu nền cho từng phần của biểu đồ
            borderColor: '#fff', // Màu viền của các phần
            borderWidth: 2, // Độ dày của viền
          }]
        },
        options: {
          responsive: true, // Biểu đồ sẽ phản hồi với kích thước của container
          plugins: {
            legend: {
              position: 'top', // Vị trí của legend
            },
            tooltip: {
              enabled: true, // Bật tooltips để hiển thị thông tin khi hover
            }
          }
        }
      });
    }
  }
}
