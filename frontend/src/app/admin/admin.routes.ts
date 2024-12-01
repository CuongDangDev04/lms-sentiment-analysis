// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManagerCoursesAdminComponent } from './components/manager-courses-admin/manager-courses-admin.component';
import { ManagerUsersAdminComponent } from './components/manager-users-admin/manager-users-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { FeedbackManagerAdminComponent } from './components/feedback-manager-admin/feedback-manager-admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/interfaces/roles';
import { ManagerCategoryAdminComponent } from './components/manager-category-admin/manager-category-admin.component';
import { SentimentAnalystisAdminComponent } from './components/sentiment-analystis-admin/sentiment-analystis-admin.component';
import { ContactadComponent } from './components/contactad/contactad.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        children: [
            {
                path: '' , redirectTo: 'dashboard', pathMatch: 'full'
            },
            {
                path: "quanlykhoahoc", component: ManagerCoursesAdminComponent   , data: { title: 'Quản lí khóa học' }         
            },
            {
                path: "quanlynguoidung", component: ManagerUsersAdminComponent, data: { title: 'Quản lí người dùng' }
            },
            {
                path: 'dashboard', component: DashboardAdminComponent, data: { title: 'Dashboard' }
            },
            {
                path: 'feedbackmanger', component: FeedbackManagerAdminComponent, data: { title: 'Quản lí phản hồi' }
            },
            {
                path: 'quanlydanhmuc' , component:ManagerCategoryAdminComponent, data: { title: 'Quản lí danh mục' }
            },
            {
                path: 'sentiment', component:SentimentAnalystisAdminComponent
            },
            {
                path: 'contact', component: ContactadComponent, data: {title: 'Liên hệ'}
            }
            
        ]
    }
];

