import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Review, SentimentAnalysis } from '../../interfaces/ReviewStudent';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SentimentAnalystisAdminComponent } from "../sentiment-analystis-admin/sentiment-analystis-admin.component";
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-feedback-manager-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SentimentAnalystisAdminComponent],
  templateUrl: './feedback-manager-admin.component.html',
  styleUrls: ['./feedback-manager-admin.component.css'],
  providers: [DatePipe]
})
export class FeedbackManagerAdminComponent implements OnInit {
  feedback: Review[] = []; // Dữ liệu phản hồi từ API
  sentimentAnalysis: SentimentAnalysis[] = []; // Dữ liệu phân tích cảm xúc
  courseId: string = ''; // Để lưu courseId từ phản hồi
  userId: string = ''; // Để lưu userId từ phản hồi
  loading: boolean = false; // Biến trạng thái loading
  courseNameFilter: string = '';
  filteredFeedback: Review[] = []; // Dữ liệu đã lọc
  studentNameFilter: string = ''; // Lọc theo tên sinh viên
  dateFilter: string = '';
  isFiltering: boolean = false;
  chartImage:string = '';


  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  paginatedFeedback: Review[] = [];

  constructor(private feedbackService: FeedbackService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchFeedback(); // Lấy dữ liệu phản hồi khi component khởi tạo
  }
  exportFeedbackToPDF(): void {
    // Lấy thời gian hiện tại
    const today = new Date();
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const formattedDate = `${daysOfWeek[today.getDay()]}, ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;
  
    // Lấy hình ảnh biểu đồ từ chart.js (nếu có)
    const chartCanvas = document.getElementById('combined-chart') as HTMLCanvasElement;
    if (chartCanvas && chartCanvas.width > 0 && chartCanvas.height > 0) {
      this.chartImage = chartCanvas.toDataURL('image/png');
    } else {
      console.error("Biểu đồ chưa được render hoặc không hợp lệ.");
    
    }
  
    // Tạo PDF
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; font-family: 'Times New Roman', Times, serif; color: black;">
        <img src="../../../../assets/logotruong.png" alt="Logo trường" style="height: 70px; margin-left: 10px; margin-top: 10px;">
        <div style="text-align: right; margin-right: 10px; line-height: 1.6;">
          <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-family: 'Times New Roman', Times, serif;font-size: 16px;">Cộng hòa Xã hội Chủ nghĩa Việt Nam</p>
          <p style="margin: 0;margin-right: 80px; font-style: italic;font-family: 'Times New Roman', Times, serif; font-size: 14px;">Độc lập - Tự do - Hạnh phúc</p>
          <hr style="width: 80%; border: 1px solid black; margin: 5px 0; margin-left: 40px">
          <p style="margin-top: 10px;margin-right: 60px; font-size: 14px;font-family: 'Times New Roman', Times, serif;">${formattedDate}</p>
        </div>
      </div>
  
      <h4 style="text-align: center; font-family: 'Times New Roman', Times, serif;margin: 20px 0; font-size: 20px;">BÁO CÁO PHÂN TÍCH TÌNH CẢM TẤT CẢ CÁC KHÓA HỌC </h4>
  
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #ddd;">
        <thead>
          <tr>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; background-color: #f2f2f2; border: 1px solid #ddd;">STT</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; background-color: #f2f2f2; border: 1px solid #ddd;">Tên sinh viên</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; background-color: #f2f2f2; border: 1px solid #ddd;">Tên khóa học</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; background-color: #f2f2f2; border: 1px solid #ddd;">Cảm xúc</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; background-color: #f2f2f2; border: 1px solid #ddd;">Bình luận</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; background-color: #f2f2f2; border: 1px solid #ddd;">Điểm tích cực</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; background-color: #f2f2f2; border: 1px solid #ddd;">Điểm tiêu cực</th>
            <th style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; background-color: #f2f2f2; border: 1px solid #ddd;">Điểm trung tính</th>
          </tr>
        </thead>
        <tbody>
          ${this.feedback.map((item, index) => `
            <tr>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; border: 1px solid #ddd;">${index + 1}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; border: 1px solid #ddd;">${item.reviewStudent.fullname}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; border: 1px solid #ddd;">${item.course.name}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentLabel}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: left; border: 1px solid #ddd;">${item.sentimentAnalysis.reviewText}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScorePositive.toFixed(3)}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScoreNegative.toFixed(3)}</td>
              <td style="padding: 8px;font-family: 'Times New Roman', Times, serif; text-align: center; border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScoreNeutral.toFixed(3)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
  
      <img src="${this.chartImage}" alt="Biểu đồ phân tích tình cảm" style="width: 100%; height: auto; margin-top: 20px;">
    `;
  
    const opt = {
      margin: 1,
      filename: 'feedback-report.pdf',
      image: { type: 'png', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().from(element).set(opt).save();
  }
  
  // Lấy dữ liệu phản hồi và courseId, userId
  fetchFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (data) => {
        this.feedback = data.map((item: Review) => {
          if (!item.sentimentAnalysis) {
            item.sentimentAnalysis = {
              id: 0,
              reviewText: '',
              sentimentLabel: 'Chưa phân tích',
              sentimentScorePositive: 0,
              sentimentScoreNegative: 0,
              sentimentScoreNeutral: 0,
            };
          }
          return item;
        });

        // Tính toán tổng số trang và phân trang
        this.calculateTotalPages();
        this.paginateFeedback();
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Tính tổng số trang dựa trên số lượng phản hồi
  calculateTotalPages(): void {
    const data = this.isFiltering ? this.filteredFeedback : this.feedback;
    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
  }

  // Phân trang các phản hồi
  paginateFeedback(): void {
    const data = this.isFiltering ? this.filteredFeedback : this.feedback;

    // Tính toán chỉ số bắt đầu và kết thúc
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Lấy phần dữ liệu theo phân trang
    this.paginatedFeedback = data.slice(startIndex, endIndex);
  }

  // Lọc phản hồi theo tên sinh viên, ngày và tên khóa học
  applyFilters(): void {
    this.filteredFeedback = this.feedback.filter((item) => {
      const studentNameMatches = this.studentNameFilter
        ? item.reviewStudent.fullname?.toLowerCase().includes(this.studentNameFilter.toLowerCase())
        : true;

      const dateMatches = this.dateFilter
        ? this.datePipe.transform(item.updatedAt, 'yyyy-MM-dd') === this.dateFilter
        : true;

      const courseNameMatches = this.courseNameFilter
        ? item.course.name?.toLowerCase().includes(this.courseNameFilter.toLowerCase())
        : true;

      return studentNameMatches && dateMatches && courseNameMatches;
    });

    // Cập nhật trạng thái lọc
    this.isFiltering = this.studentNameFilter || this.dateFilter || this.courseNameFilter ? true : false;

    // Cập nhật lại phân trang sau khi lọc
    this.calculateTotalPages();
    this.paginateFeedback();
  }

  // Hiển thị chi tiết phân tích cảm xúc
  showSentimentDetails(sentimentAnalysis: any): void {
    Swal.fire({
      title: 'Chi tiết phân tích cảm xúc',
      html: `
        <strong>Bình luận:</strong> ${sentimentAnalysis.reviewText} <br />
        <strong>Điểm tích cực:</strong> ${sentimentAnalysis.sentimentScorePositive} <br />
        <strong>Điểm tiêu cực:</strong> ${sentimentAnalysis.sentimentScoreNegative} <br />
        <strong>Điểm trung tính:</strong> ${sentimentAnalysis.sentimentScoreNeutral} <br />
        <strong>Cảm xúc:</strong> ${sentimentAnalysis.sentimentLabel} <br />
      `,
      icon: 'info',
      confirmButtonText: 'Đóng',
    });
  }

  // Định dạng lại ngày
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy'); 
  }

  // Chuyển đến trang trước
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateFeedback();
    }
  }

  // Chuyển đến trang sau
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateFeedback();
    }
  }

  // Chuyển đến trang bất kỳ
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateFeedback();
      
    }
  }
  
}
