import { Component } from '@angular/core';
import { Category } from '../../interfaces/Course'; // Đường dẫn tới interface Category
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-category-admin',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './manager-category-admin.component.html',
  styleUrl: './manager-category-admin.component.css'
})
export class ManagerCategoryAdminComponent {
  categories: Category[] = []; // Danh sách danh mục
  category: Partial<Category> = {}; // Danh mục hiện tại
  filteredCategories: Category[] = [];
  isAddingCategory = false; // Trạng thái thêm danh mục
  searchCategoryName: string = ''; 
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.loadCategories(); // Gọi API lấy danh sách danh mục
  }

  // Lấy danh sách danh mục
  loadCategories(): void {
    this.courseService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data; // Gán dữ liệu danh mục vào mảng
        this.filteredCategories = [...this.categories]; // Sao chép danh mục ban đầu
      },
      error: () => {
        console.error('Lỗi khi tải danh sách danh mục.');
      },
    });
  }

  // Lọc danh mục theo tên
  applyCategorySearch(): void {
    const keyword = this.searchCategoryName.trim().toLowerCase();
    if (keyword) {
      // Lọc danh mục theo từ khóa
      this.filteredCategories = this.categories.filter((cat) =>
        cat.name.toLowerCase().includes(keyword)
      );
    } else {
      // Hiển thị tất cả danh mục nếu từ khóa trống
      this.filteredCategories = [...this.categories];
    }
  }
  
  // Thêm danh mục mới
  addCategory(name: string): void {
    this.courseService.createCategory({ name }).subscribe({
      next: (newCategory) => {
        this.categories.push(newCategory);
        Swal.fire('Thêm thành công', 'Danh mục đã được thêm.', 'success');
      },
      error: () => {
        Swal.fire('Thêm thất bại', 'Không thể thêm danh mục.', 'error');
      },
    });
  }

  // Xử lý thêm hoặc cập nhật danh mục
  submitCategory(): void {
    if (this.category.name) {
      this.addCategory(this.category.name);
      this.isAddingCategory = false;
      this.category = {}; // Reset form danh mục
    }
  }

  // Xóa danh mục
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại danh mục này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCategory(id).subscribe({
          next: () => {
            this.categories = this.categories.filter((cat) => cat.id !== id);
            Swal.fire('Đã xóa!', 'Danh mục đã bị xóa.', 'success');
          },
          error: () => {
            Swal.fire('Xóa thất bại', 'Không thể xóa danh mục.', 'error');
          },
        });
      }
    });
  }

  // Hiển thị form thêm danh mục
  toggleAddCategoryForm(): void {
    this.isAddingCategory = !this.isAddingCategory;
    if (!this.isAddingCategory) {
      this.category = {}; // Reset form khi ẩn form thêm danh mục
    }
  }
  // Phương thức sửa danh mục
  updateCategory(id: number): void {
    if (this.category.name) {
      this.courseService.updateCategory(id, this.category).subscribe({
        next: (updatedCategory) => {
          // Cập nhật lại danh mục trong mảng categories
          const index = this.categories.findIndex(cat => cat.id === id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
          }
          Swal.fire('Cập nhật thành công', 'Danh mục đã được cập nhật.', 'success');
          this.isAddingCategory = false;
          this.category = {}; // Reset form
        },
        error: () => {
          Swal.fire('Cập nhật thất bại', 'Không thể cập nhật danh mục.', 'error');
        },
      });
    }
  }
  // Chọn danh mục để sửa
  editCategory(id: number): void {
    this.category = this.categories.find(cat => cat.id === id) || {}; // Tìm danh mục và gán vào form
    this.isAddingCategory = false; // Hiển thị form sửa danh mục
  }

}
