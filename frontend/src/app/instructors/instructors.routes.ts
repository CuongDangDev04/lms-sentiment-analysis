// src/app/instructors/instructors.routes.ts
import { Routes } from '@angular/router';
import { InstructorsComponent } from './instructors.component';
import { HeaderInstructorsComponent } from './components/header-instructors/header-instructors.component';
import { SidebarInstructorsComponent } from './components/sidebar-instructors/sidebar-instructors.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/interfaces/roles';
import { ManagerStudentInstructorComponent } from './components/manager-student-instructor/manager-student-instructor.component';
import { FeedbackManagerInstructorComponent } from './components/feedback-manager-instructor/feedback-manager-instructor.component';
import { DashboardInstructorComponent } from './components/dashboard-instructor/dashboard-instructor.component';
import { ContactComponent } from './components/contact/contact.component';

export const instructorsRoutes: Routes = [
    {
        path: 'instructors',
        component: InstructorsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Instructor] },
        children: [
            {
                path: "header", component: HeaderInstructorsComponent
            },
            {
                path: "sidebar", component: SidebarInstructorsComponent
            },
            {
                path:'quanlysinhvien', component:ManagerStudentInstructorComponent, data: { title: 'Quản lí sinh viên' }
            },
            {
                path:'feedbackmanager', component: FeedbackManagerInstructorComponent, data: { title: 'Quản lí phảm hồi' }
            },
            {
                path: 'dashboard', component: DashboardInstructorComponent, data: { title: 'Dashboard' }
            }, 
            {
                path: 'contact', component: ContactComponent, data: {title: 'Liên hệ'}
            },
            {
                path: '', component:DashboardInstructorComponent, data: {title: 'Dashboard'}
            }
        ]
    }
];
