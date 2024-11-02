import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { ManagerCoursesAdminComponent } from './components/manager-courses-admin/manager-courses-admin.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path:"quanlykhoahoc", component:ManagerCoursesAdminComponent            },
            {
                path:"sidebar", component: SidebarAdminComponent
            }
        ]
    }
];
