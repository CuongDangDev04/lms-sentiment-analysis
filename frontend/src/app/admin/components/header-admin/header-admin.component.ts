import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgStyle,RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private authService: AuthService, private router: Router ){}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
