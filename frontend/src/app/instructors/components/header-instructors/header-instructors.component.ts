import { NgClass, NgStyle } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header-instructors',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './header-instructors.component.html',
  styleUrl: './header-instructors.component.css'
})
export class HeaderInstructorsComponent {
  constructor(private router:Router, private authService: AuthService){}
  logOut(){
    this.authService.logout;
    this.router.navigate(['/login']);
  }
}
