import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { HeaderStudentComponent } from "./student/components/header-student/header-student.component";
import { HeaderAdminComponent } from "./admin/components/header-admin/header-admin.component";
import { SidebarAdminComponent } from "./admin/components/sidebar-admin/sidebar-admin.component";
import { LoginComponent } from "./shared/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, StudentComponent, HeaderStudentComponent, HeaderAdminComponent, SidebarAdminComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
