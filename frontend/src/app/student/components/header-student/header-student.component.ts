import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
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
export class HeaderStudentComponent implements OnInit, AfterViewChecked {
  isHomePage: boolean = false;
  isAboutPage: boolean = false;
  isCoursesPage: boolean = false;
  isContactPage: boolean = false;
  isDashboardPage: boolean = false;
  isDetailPage: boolean = false;
  currentPage!: string;
  studentLogin: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngAfterViewChecked() {
    // const currentRoute = this.router.url;
    // if (currentRoute.includes('dashboard')) {
    //   const dropdownMenu =
    //     this.el.nativeElement.querySelector('.dropdown-menu');
    //   if (dropdownMenu) {
    //     this.renderer.removeAttribute(dropdownMenu, 'data-bs-popper');
    //   }
    // }
  }
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

    if (this.isHomePage) {
      this.currentPage = 'Trang Chủ';
    } else if (this.isAboutPage) {
      this.currentPage = 'Giới Thiệu';
    } else if (this.isContactPage) {
      this.currentPage = 'Liên Hệ';
    } else if (this.isCoursesPage) {
      this.currentPage = 'Khóa Học';
    } else if (this.isDetailPage) {
      this.currentPage = 'Chi Tiết';
    } else if (this.isDashboardPage) {
      this.currentPage = 'Trang Cá Nhân';
    } else {
      this.currentPage = '...';
    }

    this.currentPage =
      this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1);
  }
}
