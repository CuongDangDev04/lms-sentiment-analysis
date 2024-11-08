import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ManagerCoursesAdminComponent } from "./admin/components/manager-courses-admin/manager-courses-admin.component";
import { ManagerUsersAdminComponent } from "./admin/components/manager-users-admin/manager-users-admin.component";
import { DashboardAdminComponent } from "./admin/components/dashboard-admin/dashboard-admin.component";
import { FeedbackManagerAdminComponent } from "./admin/components/feedback-manager-admin/feedback-manager-admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
