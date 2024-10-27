import { Component } from '@angular/core';
import { loadLectureResources } from './resources';
import { HeaderLectureComponent } from "./components/header-lecture/header-lecture.component";
import { SidebarLectureComponent } from "./components/sidebar-lecture/sidebar-lecture.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lecture',
  standalone: true,
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
  imports: [HeaderLectureComponent, SidebarLectureComponent, RouterOutlet],
})
export class LectureComponent {
  constructor() {
    loadLectureResources(); 
  }
}
