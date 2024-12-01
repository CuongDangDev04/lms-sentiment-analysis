import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:5000/api/course'; 
  private sentimentUrl  = 'http://localhost:5000/api/sentiment'

  constructor(private http: HttpClient) {}
 // Phương thức đếm số lượng phản hồi
 getFeedbackCount(): Observable<number> {
  return new Observable((observer) => {
    this.getAllFeedback().subscribe((feedbacks: any[]) => {
      const totalFeedbacks = feedbacks.length;
      observer.next(totalFeedbacks); // Trả về tổng số phản hồi
      observer.complete();
    });
  });
}
  // Lấy tất cả phản hồi
  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.baseUrl}/review/all`);
  }
// Lấy phân tích cảm xúc tất cả các phản hồi
getAllSentimentAnalysis(): Observable<any> {
  return this.http.get(`${this.sentimentUrl}/all`).pipe(
    tap((data) => console.log('Data từ API:', data))  // In dữ liệu trả về lên console
  );
}


 
  

}
