// src/app/admin/interfaces/Analys.ts

export interface User {
    id: number;
    username: string;
    fullname: string;
}

export interface Course {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    userId: number;
    courseId: number;
    sentimentScorePositive: number;
    sentimentScoreNegative: number;
    sentimentScoreNeutral: number;
    sentimentLabel: string;
    reviewText: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    course: Course;
}

export interface SentimentScore {
    courseId: string;
    avgPositive: number;
    avgNegative: number;
    avgNeutral: number;
}
