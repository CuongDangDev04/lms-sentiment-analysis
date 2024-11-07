import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, Filler, BarController, LinearScale, PieController, LineController, PointElement } from 'chart.js'; // Thêm PointElement

@Component({
  selector: 'app-feedback-manager-admin',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: "./feedback-manager-admin.component.html",
  styleUrls: ['./feedback-manager-admin.component.css']
})
export class FeedbackManagerAdminComponent implements OnInit, AfterViewInit {
  // Khai báo dữ liệu khóa học và sinh viên (Giả lập)
  courses = this.generateFakeCourses(10); // Giả lập 10 khóa học
  students = this.generateFakeStudents(10); // Giả lập 10 sinh viên

  // Dữ liệu phản hồi và các thuộc tính liên quan đến phân trang
  feedback = this.generateFakeFeedback(30); // Giả lập 30 phản hồi
  filteredFeedback = [...this.feedback];
  sentimentData = this.generateSentimentData();
  selectedCourse: any;
  selectedStudent: any;
  selectedEmotion: string = '';

  // Các thuộc tính phân trang
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  ngOnInit() {
    this.totalPages = Math.ceil(this.filteredFeedback.length / this.itemsPerPage);
    Chart.register(
      CategoryScale,
      BarElement,
      BarController,  
      Title,
      Tooltip,
      Legend,
      ArcElement,
      LineElement,
      Filler,
      LinearScale,
      ArcElement,
      PieController,
      LineController,
      PointElement
    );
  }

  ngAfterViewInit() {
    this.createCharts();
  }

  // Hàm giả lập dữ liệu khóa học
  generateFakeCourses(count: number) {
    const courses = [];
    for (let i = 1; i <= count; i++) {
      courses.push({
        id: i,
        name: `Course ${i}`
      });
    }
    return courses;
  }

  // Hàm giả lập dữ liệu sinh viên
  generateFakeStudents(count: number) {
    const students = [];
    for (let i = 1; i <= count; i++) {
      students.push({
        id: i,
        name: `Student ${i}`
      });
    }
    return students;
  }

  // Hàm giả lập dữ liệu phản hồi
  generateFakeFeedback(count: number) {
    const emotions = ['positive', 'neutral', 'negative'];
    const feedbackList = [];
    
    for (let i = 1; i <= count; i++) {
      const randomCourse = this.courses[Math.floor(Math.random() * this.courses.length)];
      const randomStudent = this.students[Math.floor(Math.random() * this.students.length)];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      feedbackList.push({
        id: i,
        studentName: randomStudent.name,
        courseName: randomCourse.name,
        emotion: randomEmotion,
        comment: `This is a ${randomEmotion} comment from ${randomStudent.name} about ${randomCourse.name}.`
      });
    }

    return feedbackList;
  }

  // Hàm giả lập dữ liệu phân tích tình cảm cho biểu đồ
  generateSentimentData() {
    const positive = Math.floor(Math.random() * 10) + 10;
    const neutral = Math.floor(Math.random() * 5) + 5;
    const negative = Math.floor(Math.random() * 5) + 5;

    return {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        { 
          label: 'Sentiment Analysis',
          data: [positive, neutral, negative],
          backgroundColor: ['#4caf50', '#ffc107', '#f44336']
        }
      ]
    };
  }

  // Hàm lọc phản hồi
  filterFeedback() {
    this.filteredFeedback = this.feedback.filter(f => {
      return (!this.selectedCourse || f.courseName === this.selectedCourse.name) &&
             (!this.selectedStudent || f.studentName === this.selectedStudent.name) &&
             (!this.selectedEmotion || f.emotion === this.selectedEmotion);
    });
    this.totalPages = Math.ceil(this.filteredFeedback.length / this.itemsPerPage);
    this.currentPage = 1; // Reset về trang đầu sau khi lọc
  }

  // Hàm phân trang
  get pagedFeedback() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFeedback.slice(startIndex, endIndex);
  }

  // Hàm chuyển trang
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Hàm tạo biểu đồ
  createCharts() {
    new Chart('barChart', {
      type: 'bar',
      data: this.sentimentData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            min: 0,
          }
        }
      }
    });

    new Chart('pieChart', {
      type: 'pie',
      data: this.sentimentData
    });

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Sentiment over Time',
            data: [3, 5, 2, 6, 4],
            borderColor: '#4caf50',
            fill: false
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}
