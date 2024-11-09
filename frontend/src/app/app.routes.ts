import { Routes } from '@angular/router';
import { studentRoutes } from './student/student.routes';
import { adminRoutes } from './admin/admin.routes';
import { instructorsRoutes } from './instructors/instructors.routes';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    ...instructorsRoutes,
    ...studentRoutes,
    ...adminRoutes,
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    { path: '', redirectTo: '/login',  pathMatch: 'full'}
];