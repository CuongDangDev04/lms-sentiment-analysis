import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Course } from '../interfaces/course';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAllReview(): Observable<Review[]> {
    return this.http.get<Review[]>(
      'http://localhost:5000/api/course/review/all'
    );
  }
  getReviewOfCourse(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${'http://localhost:5000/api/course/review'}/${id}`
    );
  }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:5000/api/course/');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${'http://localhost:5000/api/course'}/${id}`);
  }

  addComment(commentData: any): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/course/review/new',
      commentData
    );
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/category/');
  }
}
