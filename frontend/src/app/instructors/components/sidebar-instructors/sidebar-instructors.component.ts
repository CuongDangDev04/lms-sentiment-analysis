import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-instructors',
  standalone: true,
  imports: [NgStyle,RouterLink],
  templateUrl: './sidebar-instructors.component.html',
  styleUrl: './sidebar-instructors.component.css'
})
export class SidebarInstructorsComponent {

}
