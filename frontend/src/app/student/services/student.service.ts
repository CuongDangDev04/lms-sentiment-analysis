import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:5000/api/student';
  constructor(private http: HttpClient) {}
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:5000/api/student');
  }
  getStudentById(userId: Number): Observable<Student> {
    return this.http.get<Student>(
      `${'http://localhost:5000/api/student'}/${userId}`
    );
  }
  updateStudent(userId: Number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, data);
  }
}
