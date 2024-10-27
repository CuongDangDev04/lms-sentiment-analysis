import { Routes } from '@angular/router';

import { AboutUsComponent } from './student/about-us/components/about-us.component';
import { HomeComponent } from './student/home/components/home.component';

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
