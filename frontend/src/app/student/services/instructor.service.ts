import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  getInstructorById(id: number): Observable<any> {
    return this.http.get<any>(
      `${'http://localhost:5000/api/instructor'}/${id}`
    );
  }
  getAllInstructor(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/instructor');
  }
}
