import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/api/category';
  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getCourseOfCategory(categoryId: Number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/courseOfCategory/${categoryId}`
    );
  }
}
