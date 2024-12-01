import { Component, OnInit } from '@angular/core';
import { Review, SentimentAnalysis } from '../../interfaces/reviewStudent';
import { CourseService } from '../../services/course.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { SentimentAnalystisAdminComponent } from "../../../admin/components/sentiment-analystis-admin/sentiment-analystis-admin.component";
import { SentimentAnalysisInstructorComponent } from "../sentiment-analysis-instructor/sentiment-analysis-instructor.component";

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
