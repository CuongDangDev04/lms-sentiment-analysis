import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'] // Đã sửa 'styleUrl' thành 'styleUrls'
})
export class HeaderAdminComponent implements OnInit {
  name: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Phương thức logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Xử lý sự kiện toggle Sidebar (thay thế template)
  toggleSidebar(action: string): void {
    if (action === 'open') {
      console.log('Sidebar mở');
      // Thêm logic để mở Sidebar
    } else if (action === 'close') {
      console.log('Sidebar đóng');
      // Thêm logic để đóng Sidebar
    }
  }

  // Lifecycle hook để lấy thông tin người dùng
  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.name = user.fullname || 'Admin';
    }
  }
}
