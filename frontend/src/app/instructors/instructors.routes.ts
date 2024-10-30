import { Routes } from '@angular/router';
import { InstructorsComponent } from './instructors.component';
import { HeaderInstructorsComponent } from './components/header-instructors/header-instructors.component';
import { SidebarInstructorsComponent } from './components/sidebar-instructors/sidebar-instructors.component';

export const instructorsRoutes: Routes = [
    {
        path: 'instructors',
        component: InstructorsComponent,
        children: [
            {
                path:"header", component:HeaderInstructorsComponent
            },
            {
                path:"sidebar", component: SidebarInstructorsComponent
            }
        ]
    }
];
