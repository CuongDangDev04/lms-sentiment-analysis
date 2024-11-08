// import { Routes } from '@angular/router';
// import { InstructorsComponent } from './instructors.component';
// import { HeaderInstructorsComponent } from './components/header-instructors/header-instructors.component';
// import { SidebarInstructorsComponent } from './components/sidebar-instructors/sidebar-instructors.component';

// export const instructorsRoutes: Routes = [
//     {
//         path: 'instructors',
//         component: InstructorsComponent,
//         children: [
//             {
//                 path:"header", component:HeaderInstructorsComponent
//             },
//             {
//                 path:"sidebar", component: SidebarInstructorsComponent
//             }
//         ]
//     }
// ];
// src/app/instructors/instructors.routes.ts
import { Routes } from '@angular/router';
import { InstructorsComponent } from './instructors.component';
import { HeaderInstructorsComponent } from './components/header-instructors/header-instructors.component';
import { SidebarInstructorsComponent } from './components/sidebar-instructors/sidebar-instructors.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/roles';

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
            }
        ]
    }
];
