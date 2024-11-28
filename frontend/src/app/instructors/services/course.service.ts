import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:5000/api/course/'; // Thay bằng URL backend của bạn

  constructor(private http: HttpClient) { }

  // Phương thức để gọi API
  getCoursesByInstructor(instructorId: string): Observable<any> {
    const url = `${this.baseUrl}/instructor/${instructorId}`;
    return this.http.get(url);
  }
  getAllReviewsByInstructor(instructorId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}review/instructor/${instructorId}`);
    }
  }
