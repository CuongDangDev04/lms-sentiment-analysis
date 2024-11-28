import { Component } from '@angular/core';
import { Review, SentimentAnalysis } from '../../interfaces/reviewStudent';
import { CourseService } from '../../services/course.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-manager-instructor',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './feedback-manager-instructor.component.html',
  styleUrl: './feedback-manager-instructor.component.css',
  providers: [DatePipe]
})
export class FeedbackManagerInstructorComponent {
  instructorId: string ='';
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
    ;
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
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy'); 
  }
  resetFilters(): void {
    this.studentNameFilter = '';
    this.dateFilter = '';
    this.courseNameFilter = '';
    this.applyFilters();
  }
  
}

