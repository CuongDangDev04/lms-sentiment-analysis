// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { User } from '../interfaces/User'; // Import interface User

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // URL gốc của API cho student và instructor
  private studentUrl = 'http://localhost:5000/api/student';
  private instructorUrl = 'http://localhost:5000/api/instructor';
  private approvalUrl = 'http://localhost:5000/api/auth/approve-instructor';
  constructor(private http: HttpClient) { }



  getUserCount(): Observable<number> {
    return new Observable((observer) => {
      // Lấy tất cả sinh viên và giảng viên
      this.getAllStudents().subscribe((students: User[]) => {
        this.getAllInstructors().subscribe((instructors: User[]) => {
          // Cộng số lượng sinh viên và giảng viên
          const totalUsers = students.length + instructors.length;
          observer.next(totalUsers); // Trả về tổng số người dùng
          observer.complete();
        });
      });
    });
  }
  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.studentUrl);
  }

  getAllInstructors(): Observable<User[]> {
    return this.http.get<User[]>(this.instructorUrl);
  }
  // Phê duyệt giảng viên
  approveInstructor(userId: number, action: string): Observable<any> {
    const token = localStorage.getItem('token');  // Lấy token từ localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Thêm token vào header
    return this.http.put(`${this.approvalUrl}/${userId}`, { action }, { headers });
  }

  // Lấy học sinh theo ID
  getStudentById(id: number): Observable<User> {
    return this.http.get<User>(`${this.studentUrl}/${id}`);
  }

  // Lấy giảng viên theo ID
  getInstructorById(id: number): Observable<User> {
    return this.http.get<User>(`${this.instructorUrl}/${id}`);
  }

  // Tạo mới học sinh
  createStudent(student: User): Observable<User> {
    return this.http.post<User>(this.studentUrl, student);
  }

  // Tạo mới giảng viên
  createInstructor(instructor: User): Observable<User> {
    return this.http.post<User>(this.instructorUrl, instructor);
  }

  // Cập nhật học sinh
  updateStudent(id: number, student: User): Observable<User> {
    return this.http.put<User>(`${this.studentUrl}/${id}`, student);
  }

  // Cập nhật giảng viên
  updateInstructor(id: number, instructor: User): Observable<User> {
    return this.http.put<User>(`${this.instructorUrl}/${id}`, instructor);
  }

  // Xóa học sinh
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.studentUrl}/${id}`);
  }

  // Xóa giảng viên
  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.instructorUrl}/${id}`);
  }
}
