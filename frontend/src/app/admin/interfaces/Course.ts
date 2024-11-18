export interface Instructor {
  id: number;
  fullname: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
  number_of_lessons: number;
  number_of_students: number;
  rating: number;
  duration: number;
  imageUrl: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  category: Category;
}
