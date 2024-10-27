import { Routes } from '@angular/router';
import { LectureComponent } from './lecture.component';
import { HeaderLectureComponent } from './components/header-lecture/header-lecture.component';
import { SidebarLectureComponent } from './components/sidebar-lecture/sidebar-lecture.component';

export const lectureRoutes: Routes = [
    {
        path: 'lecture',
        component: LectureComponent,
        children: [
            {
                path:"header", component:HeaderLectureComponent
            },
            {
                path:"sidebar", component: SidebarLectureComponent
            }
        ]
    }
];
