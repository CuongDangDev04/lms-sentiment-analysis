import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-student.component.html',
  styleUrl: './contact-student.component.css',
})
export class ContactStudentComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    }
  }
}
