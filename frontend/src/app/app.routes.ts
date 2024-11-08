import { Routes } from '@angular/router';
import { studentRoutes } from './student/student.routes';
import { adminRoutes } from './admin/admin.routes';
import { instructorsRoutes } from './instructors/instructors.routes';

export const routes: Routes = [
    ...instructorsRoutes,
    ...studentRoutes,
    ...adminRoutes

];