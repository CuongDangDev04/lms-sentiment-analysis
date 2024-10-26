import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent}
];
