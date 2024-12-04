import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-student.component.html',
  styleUrl: './contact-student.component.css',
})
export class ContactStudentComponent {
  constructor(private feedbackService: FeedbackService) {}
  onSubmit(form: NgForm) {
    const formData = {
      personName: form.value.name,
      email: form.value.email,
      message: form.value.message,
    };
    if (form.valid) {
      this.feedbackService.createFeedback(formData).subscribe((respone) => {
        Swal.fire({
          title: 'Thành Công!',
          text: 'Cảm ơn bạn đã chia sẻ nhận xét. Đội ngũ của chúng tôi sẽ xem xét và phản hồi bạn trong thời gian sớm nhất.',
          icon: 'success',
          confirmButtonText: 'Đồng ý',
        });
        form.reset();
      });
    }
  }
}
