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
                path: "quanlykhoahoc", component: ManagerCoursesAdminComponent            
            },
            {
                path: "quanlynguoidung", component: ManagerUsersAdminComponent
            },
            {
                path: 'dashboard', component: DashboardAdminComponent
            },
            {
                path: 'feedbackmanger', component: FeedbackManagerAdminComponent
            },
            {
                path: 'quanlydanhmuc' , component:ManagerCategoryAdminComponent
            },
            {
                path: 'sentiment', component:SentimentAnalystisAdminComponent
            }
            
        ]
    }
];

