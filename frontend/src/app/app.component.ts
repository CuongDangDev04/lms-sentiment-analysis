import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LectureComponent } from './lecture/lecture.component';
import { StudentComponent } from './student/student.component';
import { HeaderStudentComponent } from './student/components/header-student/header-student.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LectureComponent,
    RouterLink,
    StudentComponent,
    HeaderStudentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
