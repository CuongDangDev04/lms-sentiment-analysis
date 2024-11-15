import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      'http://localhost:5000/api/student/students'
    );
  }
}
