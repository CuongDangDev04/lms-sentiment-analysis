import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-student',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkCurrentPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentPage();
      }
    });
  }

  private checkCurrentPage(): void {
    this.isHomePage =
      this.router.url === '/student' || this.router.url === '/student/home';
    this.isAboutPage = this.router.url === '/student/about';
    this.isCoursesPage = this.router.url === '/student/courses';
    this.isContactPage = this.router.url === '/student/contact';
    this.isDashboardPage = this.router.url === '/student/dashboard';
    this.isDetailPage =
      this.router.url.includes('/student/courses/') &&
      !this.router.url.endsWith('/courses');
    this.currentPage = this.router.url.replace('/student/', '').toUpperCase();
    if (this.isAboutPage) this.currentPage = 'ABOUT US';
    console.log('isHomePage:', this.isHomePage);
    console.log('isAboutPage:', this.isAboutPage);
    console.log('isCoursesPage:', this.isCoursesPage);
    console.log('isContactPage:', this.isContactPage);
  }
}
