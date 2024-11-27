import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:5000/api/course'; 

  constructor(private http: HttpClient) {}

  // Lấy tất cả phản hồi
  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.baseUrl}/review/all`);
  }
 

 
  

}
