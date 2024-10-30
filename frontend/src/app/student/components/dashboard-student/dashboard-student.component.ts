import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css',
})
export class DashboardStudentComponent implements OnInit {
  progressCurrent: number = 100; // Số giờ hoàn thành
  progressTotal: number = 173; // Tổng số giờ
  progressPercentage: number = 0; // Tỷ lệ phần trăm
  radius: number = 54; // Bán kính của vòng tròn
  circumference: number = 0; // Chu vi của vòng tròn

  ngOnInit(): void {
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
  }

  updateProgress(): void {
    this.progressPercentage = (this.progressCurrent / this.progressTotal) * 100;
  }
  profilePicture: string = 'assets/student/img/team-1.jpg';
  //tham chiếu đến thẻ <input type="file"> đã đánh dấu #fileInput trong HTML
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  // Kích hoạt input file khi click vào ảnh
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Hàm xử lý khi người dùng chọn ảnh mới
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Cập nhật ảnh đại diện
      };

      reader.readAsDataURL(file);
    }
  }
}
