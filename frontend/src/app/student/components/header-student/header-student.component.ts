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

  constructor(private router: Router) {}

  // ngOnInit() {
  //   console.log(this.router.url);

  //   console.log('/student');
  //   this.router.events.subscribe(() => {
  //     this.isHomePage =
  //       this.router.url === '/student' || this.router.url === '/student/home';
  //     this.isAboutPage = this.router.url === '/student/about';
  //   });
  //   console.log(this.isHomePage);
  // }
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
  
    console.log('isHomePage:', this.isHomePage);
    console.log('isAboutPage:', this.isAboutPage);
  }
}
