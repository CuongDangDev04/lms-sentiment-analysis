import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SentimentService {
  private baseUrl = 'http://localhost:5000/api/sentiment';
  constructor(private http: HttpClient) {}
  getSentimentAnalysisByCourseAndUser(
    courseId: Number,
    userId: Number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/course/${courseId}/user/${userId}`
    );
  }
}
