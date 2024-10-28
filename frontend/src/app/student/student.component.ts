import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  HeaderStudentComponent } from "./components/header-student/header-student.component";
import { FooterStudentComponent } from "./components/footer-student/footer-student.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterOutlet, HeaderStudentComponent, FooterStudentComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

}
