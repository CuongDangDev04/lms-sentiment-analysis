import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private baseUrl = 'http://localhost:5000/api/feedback';
  constructor(private http: HttpClient) {}
  createFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`, feedbackData);
  }
}
