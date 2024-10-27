import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { lectureRoutes } from './lecture/lecture.routes';

export const routes: Routes = [
    ...lectureRoutes,
    

];
