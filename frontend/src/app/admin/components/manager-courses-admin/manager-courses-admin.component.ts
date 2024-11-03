import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
  instructorName: string;
}

@Component({
  selector: 'app-manager-courses-admin',
  standalone: true,
  imports:[FormsModule,NgFor],
  templateUrl: './manager-courses-admin.component.html',
  styleUrls: ['./manager-courses-admin.component.css']
})
export class ManagerCoursesAdminComponent {
  course: Partial<Course> = {};
  courses: Course[] = [];
  instructors = [
    { id: 1, name: 'Giảng viên 1' },
    { id: 2, name: 'Giảng viên 2' },
    { id: 3, name: 'Giảng viên 3' },
  ];
  isEditing = false;

  onSubmit() {
    if (!this.course.instructorId) {
      alert("Vui lòng chọn giảng viên.");
      return;
    }
  
    const instructorName = this.getInstructorName(this.course.instructorId);
    
    if (this.isEditing && this.course.id !== undefined) {
      console.log("Cường Béo");
      const index = this.courses.findIndex(c => c.id === this.course.id);
      if (index !== -1) {
        this.courses[index] = {
          ...this.course,
          instructorId: this.course.instructorId,
          instructorName: instructorName,
        } as Course;
       console.log(instructorName); 
      }
    } else {
      const newCourse: Course = {
        id: this.courses.length + 1,
        name: this.course.name || '',
        description: this.course.description || '',
        instructorId: this.course.instructorId,
        instructorName: instructorName,
      };
      this.courses = [...this.courses, newCourse];
      console.log(this.courses);
    }
  
    this.resetForm();
  }
  

  editCourse(course: Course) {
    this.course = { ...course };
    this.isEditing = true;
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  resetForm() {
    this.course = {};
    this.isEditing = false;
  }

  getInstructorName(instructorId: number | undefined): string {
    const instructor = this.instructors.find(i => i.id == instructorId);
    console.log(instructor?.name)
    return instructor ? instructor.name : '';
  
  }
}