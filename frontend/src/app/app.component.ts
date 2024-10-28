import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LectureComponent } from "./lecture/lecture.component";
import { StudentComponent } from './student/student.component';
import { HeaderStudentComponent } from "./student/components/header-student/header-student.component";
import { HeaderAdminComponent } from "./admin/header-admin/header-admin.component";
import { SidebarAdminComponent } from "./admin/sidebar-admin/sidebar-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LectureComponent, RouterLink, StudentComponent, HeaderStudentComponent, HeaderAdminComponent, SidebarAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
