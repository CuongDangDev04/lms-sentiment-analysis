import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AboutUsComponent } from './student/about-us/components/about-us.component';
import { HeaderComponent } from './student/header/components/header.component';
import { FooterComponent } from './student/footer/components/footer.component';
import { HomeComponent } from './student/home/components/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    //RouterModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
