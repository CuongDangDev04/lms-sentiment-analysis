import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '' || this.router.url === 'home';
      this.isAboutPage = this.router.url === 'about';
    });
  }
}
