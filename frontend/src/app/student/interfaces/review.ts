export interface Review {
  id: number;
  courseId: number;
  rating: number;
  comment: string;

  studentId: number;
  isAnalyzed: boolean;
  createdAt: Date;
}
