import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Course } from '../interfaces/Course'; // Đường dẫn đến interface Course

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly API_URL = 'http://localhost:5000/api/course'; 
  private readonly CATEGORY_API_URL = 'http://localhost:5000/api/category';
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.API_URL, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.API_URL}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.CATEGORY_API_URL);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.CATEGORY_API_URL}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.CATEGORY_API_URL, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.CATEGORY_API_URL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CATEGORY_API_URL}/${id}`);
  }

}
