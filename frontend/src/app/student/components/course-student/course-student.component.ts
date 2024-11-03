import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
  instructorName: string;
  price: number; // Thêm thuộc tính giá khóa học
  duration: string; // Thêm thuộc tính thời gian khóa học
  imageUrl: string; // Thêm thuộc tính đường dẫn hình ảnh
  studentsCount: number; // Thêm thuộc tính số sinh viên
  category: string; // Thêm thuộc tính loại khóa học
}

@Component({
  selector: 'app-course-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-student.component.html',
  styleUrl: './course-student.component.css',
})
export class CourseStudentComponent implements OnInit {
  searchTerm: string = '';
  courses: Course[] = [
    {
      id: 1,
      name: 'Kỹ Năng Giao Tiếp Căn Bản',
      description: 'Khóa học về kỹ năng giao tiếp cho người mới.',
      instructorId: 1,
      instructorName: 'John Doe',
      price: 149.0,
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
      price: 199.0,
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
      price: 129.0,
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
      price: 249.0,
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
      price: 159.0,
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
      price: 139.0,
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
      price: 99.0,
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
      price: 189.0,
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
      price: 179.0,
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
      price: 219.0,
      duration: '4 Hrs',
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 80,
      category: 'programming',
    },
  ];

  filteredCourseList: Course[] = this.courses;
  // Phương thức lọc khóa học
  filteredCourses() {
    return this.courses.filter((course) => {
      const matchesSearchTerm = course.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return matchesSearchTerm;
    });
  }

  filterCourses(category: string) {
    // Chức năng lọc theo loại khóa học
    if (category === 'all') {
      this.filteredCourses = () => this.courses; // Hiện tất cả khóa học
    } else {
      this.filteredCourses = () =>
        this.courses.filter((course) => course.category === category);
    }
  }
  filterCoursesBySearch() {
    this.filteredCourses = () =>
      this.courses.filter((course) => {
        return course.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
  }
  //Phân trang

  currentPage: number = 1;
  pageSize: number = 9;

  ngOnInit(): void {
    // Khởi tạo phân trang nếu cần thiết
  }

  get paginatedCourses(): Course[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredCourses().slice(startIndex, endIndex);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCourses().length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
