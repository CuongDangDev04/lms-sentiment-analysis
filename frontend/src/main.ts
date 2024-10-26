import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { RecaptchaModule } from 'ng-recaptcha'; // Nhập module reCAPTCHA
// import { routes } from './app/app.routes.js'; // Nhập các routes

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes), // Cung cấp các routes
//     provideHttpClient(), // Cung cấp HttpClient cho ứng dụng
//     RecaptchaModule // Thêm module reCAPTCHA vào provider
//   ],
// }).catch((err) => console.error(err));


