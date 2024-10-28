import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { AboutStudentComponent } from './components/about-student/about-student.component';
import { CourseComponent } from './components/course/course.component';

export const studentRoutes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
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
        component: CourseComponent,
      },
    ],
  },
];
