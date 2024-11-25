import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Course } from '../interfaces/course';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://localhost:5000/api/course';
  constructor(private http: HttpClient) {}

  getAllReview(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/all`);
  }
  getReviewOfCourse(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/${id}`);
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

  registerCourse(id: number, userId: number): Observable<any> {
    const body = { userId }; // Gửi us erId trong một đối tượng JSON
    return this.http.post<any>(
      `${'http://localhost:5000/api/course'}/${id}/students`,
      body
    );
  }
  isCourseRegistered(courseId: number, userId: number): Observable<boolean> {
    return this.http
      .get<any>(`http://localhost:5000/api/course/${courseId}/students`)
      .pipe(
        map((response) => {
          // Kiểm tra trong danh sách sinh viên
          const course = response.find((c: any) => c.id === courseId);
          if (course && course.students) {
            return course.students.some(
              (student: any) => student.id === userId
            );
          }
          return false;
        })
      );
  }
  getStudentInCourse(id: Number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/students`);
  }
  getCoursesOfStudent(userId: Number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/students/${userId}`);
  }

  updateCourse(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }
}
