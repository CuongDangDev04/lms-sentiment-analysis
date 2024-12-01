import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],  // Ensure CommonModule is imported to use ngIf, ngFor
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  feedbackList: any[] = [];
  selectedFeedback: any = null;  // Define the selectedFeedback property

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
        console.log('Dữ liệu phản hồi:', this.feedbackList);
      },
      error: (err) => {
        console.error('Lỗi khi lấy phản hồi', err);
      }
    });
  }


  closeFeedbackDetails() {
    this.selectedFeedback = null;  // Reset the selected feedback when closing the details
  }
}
