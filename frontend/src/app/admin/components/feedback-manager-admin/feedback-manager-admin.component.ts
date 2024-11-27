import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Review, SentimentAnalysis } from '../../interfaces/ReviewStudent';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-feedback-manager-admin',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule ],
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

  constructor(private feedbackService: FeedbackService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchFeedback(); // Lấy dữ liệu phản hồi khi component khởi tạo
  }
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
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }


  
  showSentimentDetails(sentimentAnalysis: any): void {
    Swal.fire({
      title: 'Chi tiết phân tích cảm xúc',
      html: `
        <strong>Cảm xúc:</strong> ${sentimentAnalysis.sentimentLabel} <br />
        <strong>Điểm tích cực:</strong> ${sentimentAnalysis.sentimentScorePositive} <br />
        <strong>Điểm tiêu cực:</strong> ${sentimentAnalysis.sentimentScoreNegative} <br />
        <strong>Điểm trung tính:</strong> ${sentimentAnalysis.sentimentScoreNeutral} <br />
        <strong>Bình luận:</strong> ${sentimentAnalysis.reviewText} <br />
      `,
      icon: 'info',
      confirmButtonText: 'Đóng',
    });
  }
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy'); 
  }
}
