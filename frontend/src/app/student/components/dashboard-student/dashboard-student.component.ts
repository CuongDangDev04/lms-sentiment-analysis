import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.css',
})
export class DashboardStudentComponent implements OnInit {
  progressCurrent: number = 100; // Số giờ hoàn thành
  progressTotal: number = 173; // Tổng số giờ
  progressPercentage: number = 0; // Tỷ lệ phần trăm
  radius: number = 54; // Bán kính của vòng tròn
  circumference: number = 0; // Chu vi của vòng tròn

  courses: Course[] = [
    // Danh sách các khóa học như đã cung cấp
    {
      id: 1,
      name: 'Kỹ Năng Giao Tiếp Căn Bản',
      description: 'Khóa học về kỹ năng giao tiếp cho người mới.',
      instructorId: 1,
      instructorName: 'John Doe',
      //price: 149.0,
      duration: '1.49 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 30,
      category: 'communication',
    },
    {
      id: 2,
      name: 'Kỹ Năng Thuyết Trình Hiệu Quả',
      description: 'Khóa học nâng cao về kỹ năng thuyết trình.',
      instructorId: 2,
      instructorName: 'Jane Smith',
      //price: 199.0,
      duration: '2.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 45,
      category: 'presentation',
    },
    {
      id: 3,
      name: 'Kỹ Năng Giao Tiếp Nâng Cao',
      description: 'Khóa học nâng cao về kỹ năng giao tiếp.',
      instructorId: 3,
      instructorName: 'Alice Johnson',
      //price: 129.0,
      duration: '1.75 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 25,
      category: 'communication',
    },
    {
      id: 4,
      name: 'Quản Lý Dự Án Cơ Bản',
      description:
        'Khóa học giới thiệu về quản lý dự án và các công cụ cơ bản.',
      instructorId: 4,
      instructorName: 'David Brown',
      //price: 249.0,
      duration: '3 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 50,
      category: 'project_management',
    },
    {
      id: 5,
      name: 'Thiết Kế UX/UI cho Người Mới',
      description: 'Học các nguyên lý cơ bản của thiết kế UX/UI.',
      instructorId: 5,
      instructorName: 'Emily Davis',
      //price: 159.0,
      duration: '2 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 60,
      category: 'design',
    },
    {
      id: 6,
      name: 'Marketing Online 101',
      description: 'Khóa học căn bản về marketing kỹ thuật số.',
      instructorId: 6,
      instructorName: 'Michael Scott',
      //price: 139.0,
      duration: '1.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 35,
      category: 'marketing',
    },
    {
      id: 7,
      name: 'Quản Lý Thời Gian Hiệu Quả',
      description: 'Học cách quản lý thời gian và ưu tiên công việc.',
      instructorId: 7,
      instructorName: 'Sarah Lee',
      //price: 99.0,
      duration: '1 Hr',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 40,
      category: 'personal_development',
    },
    {
      id: 8,
      name: 'Kỹ Năng Đàm Phán',
      description: 'Cách đàm phán và thuyết phục trong công việc.',
      instructorId: 8,
      instructorName: 'Chris Martin',
      //price: 189.0,
      duration: '2.25 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 55,
      category: 'communication',
    },
    {
      id: 9,
      name: 'Phân Tích Dữ Liệu Cơ Bản',
      description: 'Giới thiệu cơ bản về phân tích dữ liệu.',
      instructorId: 9,
      instructorName: 'Alex Turner',
      //price: 179.0,
      duration: '3 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 65,
      category: 'data_analysis',
    },
    {
      id: 10,
      name: 'Lập Trình Web với JavaScript',
      description: 'Học lập trình web từ cơ bản đến nâng cao với JavaScript.',
      instructorId: 10,
      instructorName: 'Olivia Wang',
      //price: 219.0,
      duration: '4 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 80,
      category: 'programming',
    },
    {
      id: 11,
      name: 'Học Python cho Người Mới',
      description: 'Khóa học Python cơ bản cho người mới bắt đầu.',
      instructorId: 11,
      instructorName: 'Liam Nguyen',
      //price: 199.0,
      duration: '2 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 50,
      category: 'programming',
    },
    {
      id: 12,
      name: 'Kỹ Năng Giải Quyết Vấn Đề',
      description: 'Học cách giải quyết vấn đề hiệu quả.',
      instructorId: 12,
      instructorName: 'Sophia Tran',
      //price: 99.0,
      duration: '1.25 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 45,
      category: 'personal_development',
    },
    {
      id: 13,
      name: 'Thiết Kế Đồ Họa Cơ Bản',
      description: 'Giới thiệu về các nguyên lý thiết kế đồ họa cơ bản.',
      instructorId: 13,
      instructorName: 'Noah Lee',
      //price: 149.0,
      duration: '1.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 70,
      category: 'design',
    },
    {
      id: 14,
      name: 'Phân Tích Tài Chính',
      description: 'Cơ bản về phân tích tài chính cho doanh nghiệp.',
      instructorId: 14,
      instructorName: 'Emma Kim',
      //price: 259.0,
      duration: '3.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 55,
      category: 'finance',
    },
    {
      id: 15,
      name: 'Thành Công trong Bán Hàng',
      description: 'Khóa học giúp cải thiện kỹ năng bán hàng.',
      instructorId: 15,
      instructorName: 'Ethan Park',
      //price: 179.0,
      duration: '2.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 60,
      category: 'sales',
    },
    {
      id: 16,
      name: 'Kỹ Năng Giao Tiếp Căn Bản',
      description: 'Khóa học về kỹ năng giao tiếp cho người mới.',
      instructorId: 1,
      instructorName: 'John Doe',
      //price: 149.0,
      duration: '1.49 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 30,
      category: 'communication',
    },
    {
      id: 17,
      name: 'Kỹ Năng Thuyết Trình Hiệu Quả',
      description: 'Khóa học nâng cao về kỹ năng thuyết trình.',
      instructorId: 2,
      instructorName: 'Jane Smith',
      //price: 199.0,
      duration: '2.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 45,
      category: 'presentation',
    },
    {
      id: 18,
      name: 'Kỹ Năng Giao Tiếp Nâng Cao',
      description: 'Khóa học nâng cao về kỹ năng giao tiếp.',
      instructorId: 3,
      instructorName: 'Alice Johnson',
      //price: 129.0,
      duration: '1.75 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 25,
      category: 'communication',
    },
    {
      id: 19,
      name: 'Quản Lý Dự Án Cơ Bản',
      description:
        'Khóa học giới thiệu về quản lý dự án và các công cụ cơ bản.',
      instructorId: 4,
      instructorName: 'David Brown',
      //price: 249.0,
      duration: '3 Hrs',
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 50,
      category: 'project_management',
    },
    {
      id: 20,
      name: 'Thiết Kế UX/UI cho Người Mới',
      description: 'Học các nguyên lý cơ bản của thiết kế UX/UI.',
      instructorId: 5,
      instructorName: 'Emily Davis',
      //price: 159.0,
      duration: '2 Hrs',
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 60,
      category: 'design',
    },
    {
      id: 21,
      name: 'Marketing Online 101',
      description: 'Khóa học căn bản về marketing kỹ thuật số.',
      instructorId: 6,
      instructorName: 'Michael Scott',
      //price: 139.0,
      duration: '1.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 35,
      category: 'marketing',
    },
    {
      id: 22,
      name: 'ahahahahahhaahha',
      description: 'Khóa học bủ bủ lmao.',
      instructorId: 6,
      instructorName: 'Michael Scott',
      //price: 139.0,
      duration: '1.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 35,
      category: 'marketing',
    },
    {
      id: 23,
      name: 'ehehehehehehehhehehe',
      description: 'Khóa học bủ bủ lmao.',
      instructorId: 6,
      instructorName: 'Michael Scott',
      //price: 139.0,
      duration: '1.5 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 35,
      category: 'marketing',
    },
  ];
  totalCourses: number = this.courses.length; // Tổng số khóa học
  index = 0;
  currentCourses: Course[] = [
    this.courses[0 + this.index],
    this.courses[1 + this.index],
    this.courses[2 + this.index],
  ];

  current_courses() {
    // Lấy các khóa học dựa trên giá trị của this.index
    const startIndex = this.index;
    const endIndex = Math.min(this.courses.length, startIndex + 3); // Đảm bảo không vượt quá độ dài của mảng courses

    // Lấy tối đa 3 khóa học từ danh sách courses, bắt đầu từ startIndex
    this.currentCourses = this.courses.slice(startIndex, endIndex);
  }
  nextCourses() {
    if (this.index + 3 < this.totalCourses) {
      this.index += 3;
      console.log(this.index);
      this.current_courses();
      console.log(this.currentCourses);
    }
  }
  previousCourses() {
    if (this.index >= 3) {
      this.index -= 3;
      console.log(this.index);
      this.current_courses();
      console.log(this.currentCourses);
    }
  }
  ngOnInit(): void {
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
  }

  updateProgress(): void {
    this.progressPercentage = (this.progressCurrent / this.progressTotal) * 100;
  }
  profilePicture: string = 'assets/student/img/team-1.jpg';
  //tham chiếu đến thẻ <input type="file"> đã đánh dấu #fileInput trong HTML
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  // Kích hoạt input file khi click vào ảnh
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Hàm xử lý khi người dùng chọn ảnh mới
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Cập nhật ảnh đại diện
      };

      reader.readAsDataURL(file);
    }
  }
}
