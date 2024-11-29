// src/app/student/student.routes.ts
import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { AboutStudentComponent } from './components/about-student/about-student.component';

import { CourseStudentComponent } from './components/course-student/course-student.component';
import { ContactStudentComponent } from './components/contact-student/contact-student.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DetailStudentComponent } from './components/detail-student/detail-student.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/interfaces/roles';

export const studentRoutes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] },
    children: [
      {
        path: '',
        component: HomeStudentComponent,
        data: { title: 'Trang Chủ' },
      },
      {
        path: 'about',
        component: AboutStudentComponent,
        data: { title: 'Giới Thiệu' },
      },
      {
        path: 'courses',
        component: CourseStudentComponent,
        data: { title: 'Khóa Học' },
      },
      {
        path: 'contact',
        component: ContactStudentComponent,
        data: { title: 'Liên Hệ' },
      },
      {
        path: 'dashboard',
        component: DashboardStudentComponent,
        data: { title: 'Trang Cá Nhân' },
      },
      {
        path: 'courses/:id',
        component: DetailStudentComponent,
        data: { title: 'Chi tiết Khóa Học' },
      },
    ],
  },
];
