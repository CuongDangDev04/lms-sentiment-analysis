import { Routes } from '@angular/router';
import { lectureRoutes } from './lecture/lecture.routes';
import { studentRoutes } from './student/student.routes';

export const routes: Routes = [
    ...lectureRoutes,
    ...studentRoutes
];
