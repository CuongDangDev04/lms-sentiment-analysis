import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:5000/api/course/'; // URL của backend

  constructor(private http: HttpClient) { }

  // Lấy danh sách khóa học của giảng viên
  getCoursesByInstructor(instructorId: string): Observable<any> {
    const url = `${this.baseUrl}/instructor/${instructorId}`;
    return this.http.get(url);
  }

  // Lấy danh sách feedback của giảng viên
  getAllReviewsByInstructor(instructorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}review/instructor/${instructorId}`);
  }

  // Tính toán số liệu tổng quan về giảng viên
  getInstructorStats(instructorId: string): Observable<any> {
    return this.getCoursesByInstructor(instructorId).pipe(
      map((coursesData: any) => {
        const coursesCount = coursesData.length;
        const studentsCount = coursesData.reduce((count: number, course: any) => {
          return count + (course.students ? course.students.length : 0);
        }, 0);
        return { coursesCount, studentsCount };
      })
    );
  }

  // Lấy số lượng feedback
  getReviewsCount(instructorId: string): Observable<any> {
    return this.getAllReviewsByInstructor(instructorId).pipe(
      map((reviewsData: any) => reviewsData.length)
    );
  }

  // Kết hợp tất cả thống kê và trả về kết quả
  getCompleteStats(instructorId: string): Observable<any> {
    return this.getInstructorStats(instructorId).pipe(
      switchMap((stats: any) => {
        return this.getReviewsCount(instructorId).pipe(
          map((reviewsCount: number) => {
            return { 
              ...stats,
              reviewsCount
            };
          })
        );
      })
    );
  }
  
}
