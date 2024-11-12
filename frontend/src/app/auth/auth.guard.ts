// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //comment code để tạm thời bỏ tính năng phân quyền trong quá trình phát triển
    //để tránh đỡ phiền bắt đăng nhập hoài, hehe :v 

    const user = this.authService.getUser();
    if (user && route.data['roles'] && route.data['roles'].includes(user.role)) {
      
      return true;
    }
    this.router.navigate(['login']);
    return false;             
    

  }
}
