import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManagerCoursesAdminComponent } from './components/manager-courses-admin/manager-courses-admin.component';
import { ManagerUsersAdminComponent } from './manager-users-admin/manager-users-admin.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            
            {
                path:"quanlykhoahoc", component:ManagerCoursesAdminComponent            },
            {
                path:"quanlynguoidung", component: ManagerUsersAdminComponent
            }
        ]
    }
];
