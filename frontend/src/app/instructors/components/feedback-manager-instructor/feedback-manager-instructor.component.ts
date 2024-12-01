import { Component, OnInit } from '@angular/core';
import { Review, SentimentAnalysis } from '../../interfaces/reviewStudent';
import { CourseService } from '../../services/course.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { SentimentAnalysisInstructorComponent } from "../sentiment-analysis-instructor/sentiment-analysis-instructor.component";
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-feedback-manager-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, SentimentAnalysisInstructorComponent],
  templateUrl: './feedback-manager-instructor.component.html',
  styleUrls: ['./feedback-manager-instructor.component.css'],
  providers: [DatePipe]
})
export class FeedbackManagerInstructorComponent implements OnInit {
  instructorId: string = '';
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

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 7; // Số lượng phản hồi hiển thị trên mỗi trang
  totalPages: number = 0; // Tổng số trang
  paginatedFeedback: Review[] = []; // Dữ liệu phân trang
  chartImage:string = '';
  constructor(
    private courseService: CourseService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'instructor') {
      this.instructorId = user.id.toString();
    }
    this.fetchFeedback(this.instructorId);
  }

  exportFeedbackToPDF(): void {
    // Lấy thời gian hiện tại
    const today = new Date();
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const formattedDate = `${daysOfWeek[today.getDay()]}, ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

    // Lấy hình ảnh biểu đồ từ chart.js
    const chartCanvas = document.getElementById('sentiment-chart') as HTMLCanvasElement;
    if (chartCanvas) {
      this.chartImage = chartCanvas.toDataURL('image/png'); // Lấy ảnh từ biểu đồ
    }

    // Tạo PDF
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; font-family: 'Times New Roman', Times, serif; color: black;">
        <!-- Logo trường -->
        <img src="../../../../assets/logotruong.png" alt="Logo trường" style="height: 70px; margin-left: 10px; margin-top: 10px;">
        
        <!-- Quốc hiệu và Tiêu ngữ -->
        <div style="text-align: right; margin-right: 10px; line-height: 1.6;">
          <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-size: 16px; font-family: 'Times New Roman', Times, serif;">Cộng hòa Xã hội Chủ nghĩa Việt Nam</p>
          <p style="margin: 0;margin-right: 80px; font-style: italic; font-size: 14px; font-family: 'Times New Roman', Times, serif;">Độc lập - Tự do - Hạnh phúc</p>
          <hr style="width: 80%; border: 1px solid black; margin: 5px 0; margin-left: 40px">
          <p style="margin-top: 10px;margin-right: 60px; font-size: 14px; font-family: 'Times New Roman', Times, serif;">${formattedDate}</p>
        </div>
      </div>
  
      <!-- Tiêu đề báo cáo -->
      <h4 style="text-align: center; margin: 20px 0; font-size: 20px; font-family: 'Times New Roman', Times, serif; color: black;">
        BÁO CÁO PHÂN TÍCH TÌNH CẢM CÁC KHÓA HỌC GIẢNG DẠY
      </h4>
  
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #ddd; font-family: 'Times New Roman', Times, serif; color: black;">
        <thead>
          <tr>
            <th style="width: 5%; padding: 8px; text-align: center; background-color: #f2f2f2; font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd; font-weight: bold;">STT</th>
            <th style="width: 15%; padding: 8px; text-align: left; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Tên sinh viên</th>
            <th style="width: 20%; padding: 8px; text-align: left; background-color: #f2f2f2; font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd; font-weight: bold;">Tên khóa học</th>
            <th style="width: 10%; padding: 8px; text-align: left; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Cảm xúc</th>
            <th style="width: 25%; padding: 8px; text-align: left; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Bình luận</th>
            <th style="width: 8%; padding: 8px; text-align: center; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Điểm tích cực</th>
            <th style="width: 8%; padding: 8px; text-align: center; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Điểm tiêu cực</th>
            <th style="width: 8%; padding: 8px; text-align: center; background-color: #f2f2f2;font-family: 'Times New Roman', Times, serif; border: 1px solid #ddd; font-weight: bold;">Điểm trung tính</th>
          </tr>
        </thead>
        <tbody>
          ${this.filteredFeedback.map((item, index) => `
            <tr>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${index + 1}</td>
              <td style="padding: 8px; text-align: left; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.reviewStudent.fullname}</td>
              <td style="padding: 8px; text-align: left; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.course.name}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentLabel}</td>
              <td style="padding: 8px; text-align: left; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.sentimentAnalysis.reviewText}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScorePositive.toFixed(3)}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScoreNegative.toFixed(3)}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;font-family: 'Times New Roman', Times, serif;border: 1px solid #ddd;">${item.sentimentAnalysis.sentimentScoreNeutral.toFixed(3)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <img src="${this.chartImage}" alt="Biểu đồ phân tích tình cảm" style="width: 100%; height: auto; margin-top: 20px;">
    `;

    const opt = {
      margin:       1,
      filename:     'sentiment-analysis-report.pdf',
      image:        { type: 'png', quality: 1 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }








  // Fetch feedback and apply sentiment analysis if needed
  fetchFeedback(instructorId: string): void {
    this.courseService.getAllReviewsByInstructor(this.instructorId).subscribe(
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
        this.filteredFeedback = [...this.feedback]; // Sync the filtered feedback
        this.calculateTotalPages();
        this.paginateFeedback();
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Calculate total pages based on the number of filtered feedback items
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredFeedback.length / this.itemsPerPage);
  }

  // Paginate the feedback based on the current page and items per page
  paginateFeedback(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedback = this.filteredFeedback.slice(startIndex, endIndex);
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateFeedback();
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateFeedback();
    }
  }

  // Go to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateFeedback();
    }
  }

  // Get a list of page numbers for pagination controls
  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Apply filters based on user input
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

    // Recalculate pages and apply pagination after filtering
    this.calculateTotalPages();
    this.paginateFeedback();
    this.isFiltering = this.studentNameFilter || this.dateFilter || this.courseNameFilter ? true : false;
  }

  // Reset all filters
  resetFilters(): void {
    this.studentNameFilter = '';
    this.dateFilter = '';
    this.courseNameFilter = '';
    this.applyFilters();
  }

  // Show sentiment analysis details in a modal
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

  // Format date
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy');
  }
}
