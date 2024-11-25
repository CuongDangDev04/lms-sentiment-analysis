import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:5000/api/course'; // URL của API
  private Url = 'http://localhost:5000/api/sentiment'; // URL của API

  constructor(private http: HttpClient) {}

  // Lấy tất cả phản hồi
  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.baseUrl}/review/all`);
  }
 

  // Phân tích cảm xúc theo khóa học và người dùng
  analyzeSentiment(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.Url}/analyze/${courseId}/${userId}`, {});
  }
  // Phân tích cảm xúc cho toàn bộ khóa học
  analyzeCourseReviews(courseId: number): Observable<any> {
    return this.http.post(`${this.Url}/analyze/${courseId}`, {});
  }
  

}
