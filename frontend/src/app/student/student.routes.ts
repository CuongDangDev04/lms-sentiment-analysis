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
import { Role } from '../models/roles';

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
      },
      {
        path: 'about',
        component: AboutStudentComponent,
      },
      {
        path: 'courses',
        component: CourseStudentComponent,
      },
      {
        path: 'contact',
        component: ContactStudentComponent,
      },
      {
        path: 'dashboard',
        component: DashboardStudentComponent,
      },
      {
        path: 'courses/:id',
        component: DetailStudentComponent,
      },
    ],
  },

];

