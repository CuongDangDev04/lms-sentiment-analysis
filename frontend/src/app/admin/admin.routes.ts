import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path:"header", component:HeaderAdminComponent
            },
            {
                path:"sidebar", component: SidebarAdminComponent
            }
        ]
    }
];
