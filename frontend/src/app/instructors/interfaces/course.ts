// Interface biểu diễn thông tin Category
export interface Category {
    id: number;
    name: string;
  }
  
  // Interface biểu diễn thông tin Student
  export interface Student {
    id: number;
    fullname: string;
    email: string;
  }
  
  // Interface biểu diễn thông tin Course
  export interface Course {
    id: number;
    name: string;
    description: string;
    instructorId: number;
    number_of_lessons: number | null;
    number_of_students: number | null;
    rating: number;
    duration: number | null;
    imageUrl: string | null;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    students: Student[];
    studentsCount: number; 
  }
  