import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class FeedbackService {

  private apiUrl = 'http://localhost:5000/api/feedback';

  constructor(private http: HttpClient) { }

  // Lấy tất cả phản hồi
  getAllFeedback(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Lấy phản hồi theo id
  getFeedbackById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
