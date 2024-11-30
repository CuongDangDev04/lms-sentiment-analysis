import { Component } from '@angular/core';
import { HeaderInstructorsComponent } from "./components/header-instructors/header-instructors.component";
import { RouterOutlet } from '@angular/router';
import { SidebarInstructorsComponent } from "./components/sidebar-instructors/sidebar-instructors.component";
import { SentimentAnalysisInstructorComponent } from "./components/sentiment-analysis-instructor/sentiment-analysis-instructor.component";

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [HeaderInstructorsComponent, RouterOutlet, SidebarInstructorsComponent],
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.css'
})
export class InstructorsComponent {

}
