import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Review, SentimentAnalysis } from '../../interfaces/ReviewStudent';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SentimentAnalystisAdminComponent } from "../sentiment-analystis-admin/sentiment-analystis-admin.component";

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

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  paginatedFeedback: Review[] = [];

  constructor(private feedbackService: FeedbackService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchFeedback(); // Lấy dữ liệu phản hồi khi component khởi tạo
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
