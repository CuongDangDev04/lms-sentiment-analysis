import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service'; // Đường dẫn tới service
import { Category, Course, Instructor } from '../../interfaces/Course'; // Đường dẫn tới interface
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manager-courses-admin',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './manager-courses-admin.component.html',
  styleUrls: ['./manager-courses-admin.component.css'],
})
export class ManagerCoursesAdminComponent implements OnInit {
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 7; // Số khóa học mỗi trang
  totalPages: number = 0; // Tổng số trang
  courses: Course[] = []; // Danh sách khóa học
  course: Partial<Course> = {}; // Khóa học hiện tại
  categories: Category[] = []; // Danh sách danh mục
  category: Partial<Category> = {}; // Danh mục hiện tại
  instructors: Instructor[] = [];

  isEditing = false; // Trạng thái chỉnh sửa khóa học
  isAdding = false; // Trạng thái thêm khóa học
  filteredCourses: Course[] = []; // Danh sách khóa học đã lọc
  searchCourseName: string = ''; // Tìm kiếm theo tên khóa học
  selectedInstructor: string = ''; // Giảng viên đã chọn
  selectedCategory: string = ''; // Danh mục đã chọn

  imageUrl: string = '';

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCourses(); // Gọi API lấy danh sách khóa học
    this.loadCategories();
    this.loadInstructors();
  }

  // Hàm tính tổng số trang
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(
      this.filteredCourses.length / this.itemsPerPage
    );
  }

  // Phương thức trả về các trang cho phân trang
  getPages(): number[] {
    let pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Chuyển đến trang được chọn
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Chuyển đến trang trước
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Chuyển đến trang tiếp theo
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  loadCategories(): void {
    this.courseService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        console.error('Lỗi khi tải danh mục.');
      },
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = [...data]; // Gán danh sách khóa học ban đầu vào filteredCourses
        this.calculateTotalPages(); // Tính tổng số trang khi tải khóa học
      },
      error: () => {
        console.error('Lỗi khi tải danh sách khóa học.');
      },
    });
  }

  loadInstructors(): void {
    this.userService.getAllInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
      },
      error: () => {
        console.error('Lỗi khi tải danh sách giảng viên.');
      },
    });
  }

  applySearch(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesName = course.name
        .toLowerCase()
        .includes(this.searchCourseName.toLowerCase());
      const matchesInstructor = this.selectedInstructor
        ? course.instructorId === Number(this.selectedInstructor)
        : true;
      const matchesCategory = this.selectedCategory
        ? course.categoryId === Number(this.selectedCategory)
        : true;

      return matchesName && matchesInstructor && matchesCategory;
    });

    this.currentPage = 1; // Đặt lại trang hiện tại về 1 sau khi tìm kiếm
    this.calculateTotalPages(); // Tính lại tổng số trang
  }

  // Chỉnh sửa khóa học
  editCourse(course: Course): void {
    this.course = { ...course };
    window.scrollTo(0, 0);

    this.isEditing = true;
    this.isAdding = false;
  }

  // Xử lý thêm hoặc cập nhật khóa học
  onSubmit(): void {
    if (this.isEditing && this.course.id) {
      // Cập nhật khóa học
      this.courseService.updateCourse(this.course.id, this.course).subscribe({
        next: () => {
          Swal.fire(
            'Cập nhật thành công',
            'Khóa học đã được cập nhật.',
            'success'
          );
          this.loadCourses();
          this.resetForm();
        },
        error: () => {
          Swal.fire(
            'Cập nhật thất bại',
            'Không thể cập nhật khóa học.',
            'error'
          );
        },
      });
    } else {
      // Thêm mới khóa học
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          Swal.fire('Thêm thành công', 'Khóa học đã được thêm.', 'success');
          this.loadCourses();
          this.resetForm();
        },
        error: () => {
          Swal.fire('Thêm thất bại', 'Không thể thêm khóa học.', 'error');
        },
      });
    }
  }

  // Đặt lại form
  resetForm(): void {
    this.course = {};
    this.isEditing = false;
    this.imageUrl = '';
  }

  // Xóa khóa học
  deleteCourse(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại khóa học này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe({
          next: () => {
            Swal.fire('Đã xóa!', 'Khóa học đã bị xóa.', 'success');
            this.loadCourses();
          },
          error: () => {
            Swal.fire('Xóa thất bại', 'Không thể xóa khóa học.', 'error');
          },
        });
      }
    });
  }

  // Hiển thị form thêm khóa học
  toggleAddCourseForm(): void {
    this.isAdding = !this.isAdding;
    if (this.isAdding) {
      this.isEditing = false;
      this.resetForm();
    }
  }

  // Hủy bỏ thêm khóa học
  cancelAdd(): void {
    this.isAdding = false;
    this.resetForm();
  }
  getPagedCourses(): Course[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, endIndex);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseService.uploadImage(file).subscribe(
        (res: any) => {
          this.imageUrl = res.data.url;
          this.course.imageUrl = this.imageUrl;
          console.log('Đường dẫn ảnh:', this.imageUrl);
        },
        (err) => {
          console.error('Lỗi upload ảnh:', err);
        }
      );
    }
  }
}
