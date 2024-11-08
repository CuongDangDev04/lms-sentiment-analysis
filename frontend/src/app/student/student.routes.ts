// import { Routes } from '@angular/router';
// import { StudentComponent } from './student.component';
// import { HomeStudentComponent } from './components/home-student/home-student.component';
// import { AboutStudentComponent } from './components/about-student/about-student.component';

// export const studentRoutes: Routes = [
//     {
//         path: 'student',
//         component: StudentComponent,
//         children: [
//             {
//                 path:"", component: HomeStudentComponent
//             },
//             {
//                 path:"about", component: AboutStudentComponent
//             }
//         ]
//     }
// ];
// src/app/student/student.routes.ts
import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { AboutStudentComponent } from './components/about-student/about-student.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/roles';

export const studentRoutes: Routes = [
    {
        path: 'student',
        component: StudentComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Student] },
        children: [
            {
                path: "", component: HomeStudentComponent
            },
            {
                path: "about", component: AboutStudentComponent
            }
        ]
    }
];

