import { Routes } from '@angular/router';
import { HomeComponent } from './student/home/home.component';
import { AboutUsComponent } from './student/about-us/about-us.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us Page',
  },
];
