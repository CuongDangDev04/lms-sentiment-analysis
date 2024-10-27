import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './student/home/home.component';
import { HeaderComponent } from './student/header/header.component';
import { FooterComponent } from './student/footer/footer.component';
import { AboutUsComponent } from './student/about-us/about-us.component';

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
