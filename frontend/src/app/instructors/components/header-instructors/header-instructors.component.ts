import { NgClass, NgStyle } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
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
export class HeaderInstructorsComponent implements OnInit {
  name: string ='';
  constructor(private router:Router, private authService: AuthService){}
  ngOnInit(){
    const user = this.authService.getUser();
    if(user){
      this.name = user.fullname.toString();
    }

  }
  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  

}
