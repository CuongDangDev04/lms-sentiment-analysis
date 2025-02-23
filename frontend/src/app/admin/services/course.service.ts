import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category, Course } from '../interfaces/Course'; // Đường dẫn đến interface Course

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly API_URL = 'http://localhost:5000/api/course';
  private readonly CATEGORY_API_URL = 'http://localhost:5000/api/category';

  private uploadImg_apiKey = '6e1b2c19fe7d7a35679d2729675b0a3b';
  private uploadUrl = `https://api.imgbb.com/1/upload?key=${this.uploadImg_apiKey}`;
  constructor(private http: HttpClient) {}
  // Phương thức để đếm số lượng khóa học
  getCourseCount(): Observable<number> {
    return this.getAllCourses().pipe(
      map((courses: Course[]) => courses.length) // Đếm số lượng khóa học trong mảng
    );
  }

  // Phương thức để đếm số lượng thể loại
  getCategoryCount(): Observable<number> {
    return this.getAllCategories().pipe(
      map((categories: Category[]) => categories.length) // Đếm số lượng thể loại trong mảng
    );
  }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.CATEGORY_API_URL);
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

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.CATEGORY_API_URL}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.CATEGORY_API_URL, category);
  }

  updateCategory(
    id: number,
    category: Partial<Category>
  ): Observable<Category> {
    return this.http.put<Category>(`${this.CATEGORY_API_URL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CATEGORY_API_URL}/${id}`);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(this.uploadUrl, formData);
  }
}
