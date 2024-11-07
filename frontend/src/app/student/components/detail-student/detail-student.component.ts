import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-student.component.html',
  styleUrl: './detail-student.component.css',
})
export class DetailStudentComponent implements OnInit {
  showStickyBox = false;

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const container = document.querySelector('.container-title');
    const containerBottom = container?.getBoundingClientRect().bottom || 0;

    // Hiển thị box-sticky nếu container-title đã cuộn qua khỏi màn hình
    this.showStickyBox = containerBottom <= 0;
  }
}
