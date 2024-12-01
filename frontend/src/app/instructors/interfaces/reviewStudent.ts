// Interface đại diện cho đối tượng Student trong review
export interface ReviewStudent {
    id: number;
    fullname: string;
    email: string;
  }
  
  // Interface đại diện cho đối tượng Course trong review
  export interface Course {
    id: number;
    name: string;
  }
  export interface SentimentAnalysis {
    id: number;
    sentimentScorePositive: number;
    sentimentScoreNegative: number;
    sentimentScoreNeutral: number;
    sentimentLabel: string;
    reviewText: string;
  }
  
  // Interface đại diện cho một review
  export interface Review {
    courseId: number;
    userId: number;
    rating: number;
    comment: string;
    createdAt: string; // Sử dụng kiểu string để đại diện cho ngày giờ
    updatedAt: string;
    reviewStudent: ReviewStudent; // Dữ liệu của sinh viên viết review
    course: Course; // Dữ liệu của khóa học liên quan
    isAnalyzed: Boolean;
    sentimentAnalysis: SentimentAnalysis
  }
  
  // Interface danh sách các review
  export interface ReviewList extends Array<Review> {}
  