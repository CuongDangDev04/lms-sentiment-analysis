import { Routes } from '@angular/router';
import { lectureRoutes } from './lecture/lecture.routes';
import { studentRoutes } from './student/student.routes';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
    ...lectureRoutes,
    ...studentRoutes,
    ...adminRoutes

];
