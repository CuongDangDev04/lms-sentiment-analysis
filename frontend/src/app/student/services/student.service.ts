import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:5000/api/student';
  constructor(private http: HttpClient) {}
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }
  getStudentById(userId: Number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${userId}`);
  }
  updateStudent(userId: Number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, data);
  }
  checkFileExists(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map((response) => response.status === 200), // Nếu status là 200, file tồn tại
      catchError(() => of(false)) // Nếu có lỗi (file không tồn tại), trả về false
    );
  }
}
