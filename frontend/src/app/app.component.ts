import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ManagerCoursesAdminComponent } from "./admin/components/manager-courses-admin/manager-courses-admin.component";
import { ManagerUsersAdminComponent } from "./admin/manager-users-admin/manager-users-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ManagerCoursesAdminComponent, ManagerUsersAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
