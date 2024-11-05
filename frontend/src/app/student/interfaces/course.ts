export interface Course {
  id: number;
  name: string;
  description: string;
  instructorId: number;
  instructorName: string;
  price: number;
  duration: string;
  imageUrl: string;
  studentsCount: number;
  category: string;
}
