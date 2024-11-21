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
  isAddingCategory = false; // Trạng thái thêm danh mục
  
  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.loadCategories(); // Gọi API lấy danh sách danh mục
  }

  // Lấy danh sách danh mục
  loadCategories(): void {
    this.courseService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data; // Gán dữ liệu danh mục vào mảng
      },
      error: () => {
        console.error('Lỗi khi tải danh sách danh mục.');
      },
    });
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
}
