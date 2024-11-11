import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Student {
  name: string;
  email: string;
  feedback: string;
}

@Component({
  selector: 'app-manager-student-instructor',
  standalone: true,
  imports:[FormsModule,NgFor,NgIf],
  templateUrl: './manager-student-instructor.component.html',
  styleUrls: ['./manager-student-instructor.component.css']
})
export class ManagerStudentInstructorComponent {
  students: Student[] = [
    { name: 'Nguyễn Văn A', email: 'nguyenvna@example.com', feedback: 'Tham gia tích cực' },
    { name: 'Trần Thị B', email: 'tranthib@example.com', feedback: 'Hoàn thành bài tập đúng hạn' },
    { name: 'Lê Văn C', email: 'levanc@example.com', feedback: 'Cần cải thiện tham gia lớp' }
  ];

  selectedStudent: Student | null = null;
  searchName: string = '';
  searchEmail: string = '';

  viewStudentDetails(student: Student): void {
    Swal.fire({
      title: `Thông tin chi tiết của ${student.name}`,
      html: `
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phản hồi:</strong> ${student.feedback}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Đóng'
    });
  }

  deleteStudent(student: Student): void {
    Swal.fire({
      title: 'Xóa sinh viên',
      text: `Bạn chắc chắn muốn xóa sinh viên ${student.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic xóa sinh viên khỏi danh sách
        this.students = this.students.filter(s => s !== student);
        Swal.fire('Đã xóa!', `${student.name} đã được xóa khỏi danh sách.`, 'success');
      }
    });
  }

  closeModal(): void {
    this.selectedStudent = null;
  }

  getFilteredStudents(): Student[] {
    return this.students.filter(student => 
      student.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
      student.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }
}
