import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { FeedbackService } from '../../services/feedback.service';
import { SentimentAnalystisAdminComponent } from "../sentiment-analystis-admin/sentiment-analystis-admin.component";
import { ContactComponent } from "../../../instructors/components/contact/contact.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  imports: [SentimentAnalystisAdminComponent, ContactComponent]
})
export class DashboardAdminComponent implements OnInit {
  stats = {
    users: 0,
    feedbacks: 0,
    courses: 0,
    categories: 0,
    sentimentAnalysis: 0
  };

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    // Lấy số lượng người dùng
    this.userService.getUserCount().subscribe(
      (count: number) => {
        this.stats.users = count; // Cập nhật số lượng người dùng
      },
      (error) => {
        console.error('Lỗi khi lấy số lượng người dùng:', error);
      }
    );

    // Lấy số lượng khóa học và thể loại
    this.courseService.getCourseCount().subscribe(
      (count: number) => {
        this.stats.courses = count;
      },
      (error) => {
        console.error('Lỗi khi lấy số lượng khóa học:', error);
      }
    );

    this.courseService.getCategoryCount().subscribe(
      (count: number) => {
        this.stats.categories = count;
      },
      (error) => {
        console.error('Lỗi khi lấy số lượng thể loại:', error);
      }
    );

    // Lấy số lượng phản hồi
    this.feedbackService.getFeedbackCount().subscribe(
      (count: number) => {
        this.stats.feedbacks = count; // Cập nhật số lượng phản hồi
      },
      (error) => {
        console.error('Lỗi khi lấy số lượng phản hồi:', error);
      }
    );
  }
}
