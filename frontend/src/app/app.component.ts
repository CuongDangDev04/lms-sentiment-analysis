import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


import { DashboardAdminComponent } from './admin/components/dashboard-admin/dashboard-admin.component';
import { FeedbackManagerAdminComponent } from './admin/components/feedback-manager-admin/feedback-manager-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
