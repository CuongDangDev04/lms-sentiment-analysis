import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import { DashboardAdminComponent } from './admin/components/dashboard-admin/dashboard-admin.component';
import { FeedbackManagerAdminComponent } from './admin/components/feedback-manager-admin/feedback-manager-admin.component';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit() {
    // Lắng nghe sự thay đổi route và cập nhật title
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // Chỉ bắt NavigationEnd
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['title']) {
          this.titleService.setTitle(data['title']); // Cập nhật title
        } else {
          this.titleService.setTitle('Default Title'); // Title mặc định
        }
      });
  }
  title = 'frontend';
}
