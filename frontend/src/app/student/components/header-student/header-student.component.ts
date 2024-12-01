import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header-student',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header-student.component.html',
  styleUrl: './header-student.component.css',
})
export class HeaderStudentComponent implements OnInit {
  isHomePage: boolean = false;
  isAboutPage: boolean = false;
  isCoursesPage: boolean = false;
  isContactPage: boolean = false;
  isDashboardPage: boolean = false;
  isDetailPage: boolean = false;
  currentPage!: string;
  studentLogin: any;
  constructor(private router: Router, private authService: AuthService) {}
  logOut() {
    this.authService.logout;
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.checkCurrentPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentPage();
      }
    });
    this.authService.fetchUserInfo().subscribe((user) => {
      this.studentLogin = user;
    });
  }

  private checkCurrentPage(): void {
    const urlWithoutParams = this.router.url.split('?')[0]; // Bỏ queryParams

    this.isHomePage =
      urlWithoutParams === '/student' || urlWithoutParams === '/student/home';
    this.isAboutPage = urlWithoutParams === '/student/about';
    this.isCoursesPage = urlWithoutParams === '/student/courses';
    this.isContactPage = urlWithoutParams === '/student/contact';
    this.isDashboardPage = urlWithoutParams === '/student/dashboard';
    this.isDetailPage =
      urlWithoutParams.includes('/student/courses/') &&
      !urlWithoutParams.endsWith('/courses');

    this.currentPage = urlWithoutParams.replace('/student/', '');
    if (this.isAboutPage) this.currentPage = 'About Us';

    this.currentPage =
      this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1);
  }
}
