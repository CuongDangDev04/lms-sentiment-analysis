import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Course } from '../interfaces/course';
import { Student } from '../interfaces/student';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  reviews: Review[] = [
    // Reviews cho khóa học 1
    {
      id: 1,
      courseId: 1,
      rating: 4,
      comment: 'Bài giảng hay',
      createdAt: new Date('12/01/2024'),
    },
    {
      id: 2,
      courseId: 1,
      rating: 5,
      comment: 'Giải thích rất chi tiết!',
      createdAt: new Date('13/01/2024'),
    },
    {
      id: 3,
      courseId: 1,
      rating: 4,
      comment: 'Bài giảng hay qua',
      createdAt: new Date('14/01/2024'),
    },

    // Reviews cho khóa học 2
    {
      id: 4,
      courseId: 2,
      rating: 3,
      comment: 'Khá ổn nhưng cần cải thiện thêm.',
      createdAt: new Date('14/01/2024'),
    },
    {
      id: 5,
      courseId: 2,
      rating: 5,
      comment: 'Giải thích rất dễ hiểu!',
      createdAt: new Date('15/01/2024'),
    },
    {
      id: 6,
      courseId: 2,
      rating: 4,
      comment: 'Nội dung rất đầy đủ',
      createdAt: new Date('16/01/2024'),
    },

    // Reviews cho khóa học 3
    {
      id: 7,
      courseId: 3,
      rating: 5,
      comment: 'Khóa học tuyệt vời!',
      createdAt: new Date('17/01/2024'),
    },
    {
      id: 8,
      courseId: 3,
      rating: 4,
      comment: 'Tôi học được nhiều điều mới.',
      createdAt: new Date('18/01/2024'),
    },
    {
      id: 9,
      courseId: 3,
      rating: 4,
      comment: 'Khóa học rất hay, cần thêm ví dụ thực tế.',
      createdAt: new Date('19/01/2024'),
    },

    // Reviews cho khóa học 4
    {
      id: 10,
      courseId: 4,
      rating: 4,
      comment: 'Rất bổ ích, nhưng cần thêm bài tập thực hành.',
      createdAt: new Date('20/01/2024'),
    },
    {
      id: 11,
      courseId: 4,
      rating: 5,
      comment: 'Mình học được nhiều công cụ quản lý dự án mới!',
      createdAt: new Date('21/01/2024'),
    },
    {
      id: 12,
      courseId: 4,
      rating: 3,
      comment: 'Khóa học cần cải thiện phần lý thuyết.',
      createdAt: new Date('22/01/2024'),
    },

    // Reviews cho khóa học 5
    {
      id: 13,
      courseId: 5,
      rating: 4,
      comment: 'Khóa học rất hay, dễ hiểu.',
      createdAt: new Date('23/01/2024'),
    },
    {
      id: 14,
      courseId: 5,
      rating: 5,
      comment: 'Giảng viên rất nhiệt tình và rõ ràng.',
      createdAt: new Date('24/01/2024'),
    },
    {
      id: 15,
      courseId: 5,
      rating: 4,
      comment: 'Nội dung khá ổn, nhưng phần lý thuyết cần ngắn gọn hơn.',
      createdAt: new Date('25/01/2024'),
    },

    // Reviews cho khóa học 6
    {
      id: 16,
      courseId: 6,
      rating: 3,
      comment: 'Nội dung chưa đủ sâu sắc.',
      createdAt: new Date('26/01/2024'),
    },
    {
      id: 17,
      courseId: 6,
      rating: 4,
      comment: 'Khóa học rất cơ bản, phù hợp với người mới bắt đầu.',
      createdAt: new Date('27/01/2024'),
    },
    {
      id: 18,
      courseId: 6,
      rating: 5,
      comment: 'Khóa học rất hữu ích, có thể áp dụng ngay vào công việc.',
      createdAt: new Date('28/01/2024'),
    },

    // Reviews cho khóa học 7
    {
      id: 19,
      courseId: 7,
      rating: 4,
      comment: 'Khóa học giúp tôi cải thiện kỹ năng quản lý thời gian.',
      createdAt: new Date('29/01/2024'),
    },
    {
      id: 20,
      courseId: 7,
      rating: 5,
      comment: 'Cảm ơn giảng viên, tôi học được rất nhiều.',
      createdAt: new Date('30/01/2024'),
    },
    {
      id: 21,
      courseId: 7,
      rating: 3,
      comment: 'Khóa học thiếu bài tập thực hành.',
      createdAt: new Date('31/01/2024'),
    },

    // Reviews cho khóa học 8
    {
      id: 22,
      courseId: 8,
      rating: 4,
      comment: 'Giảng viên rất tốt và bài học dễ tiếp thu.',
      createdAt: new Date('01/02/2024'),
    },
    {
      id: 23,
      courseId: 8,
      rating: 5,
      comment: 'Khóa học rất chi tiết và dễ hiểu.',
      createdAt: new Date('02/02/2024'),
    },
    {
      id: 24,
      courseId: 8,
      rating: 4,
      comment: 'Rất thích khóa học này!',
      createdAt: new Date('03/02/2024'),
    },

    // Reviews cho khóa học 9
    {
      id: 25,
      courseId: 9,
      rating: 3,
      comment: 'Khóa học cần cải thiện phần lý thuyết.',
      createdAt: new Date('04/02/2024'),
    },
    {
      id: 26,
      courseId: 9,
      rating: 5,
      comment: 'Khóa học rất hay và bổ ích.',
      createdAt: new Date('05/02/2024'),
    },
    {
      id: 27,
      courseId: 9,
      rating: 4,
      comment: 'Nội dung khá ổn, nhưng cần thêm ví dụ.',
      createdAt: new Date('06/02/2024'),
    },

    // Reviews cho khóa học 10
    {
      id: 28,
      courseId: 10,
      rating: 4,
      comment: 'Khóa học rất hay, giảng viên dễ hiểu.',
      createdAt: new Date('07/02/2024'),
    },
    {
      id: 29,
      courseId: 10,
      rating: 5,
      comment: 'Tuyệt vời, rất bổ ích.',
      createdAt: new Date('08/02/2024'),
    },
    {
      id: 30,
      courseId: 10,
      rating: 4,
      comment: 'Rất nhiều kiến thức mới, tôi sẽ áp dụng ngay.',
      createdAt: new Date('09/02/2024'),
    },

    // Reviews cho khóa học 11
    {
      id: 31,
      courseId: 11,
      rating: 4,
      comment: 'Khóa học rất dễ tiếp cận.',
      createdAt: new Date('10/02/2024'),
    },
    {
      id: 32,
      courseId: 11,
      rating: 5,
      comment: 'Khóa học giúp tôi cải thiện kỹ năng lập trình.',
      createdAt: new Date('11/02/2024'),
    },
    {
      id: 33,
      courseId: 11,
      rating: 4,
      comment: 'Tôi đã học được nhiều kiến thức mới.',
      createdAt: new Date('12/02/2024'),
    },

    // Reviews cho khóa học 12
    {
      id: 34,
      courseId: 12,
      rating: 3,
      comment: 'Khóa học khá tốt nhưng cần cải thiện phần thực hành.',
      createdAt: new Date('13/02/2024'),
    },
    {
      id: 35,
      courseId: 12,
      rating: 4,
      comment: 'Khóa học có nội dung rất bổ ích.',
      createdAt: new Date('14/02/2024'),
    },
    {
      id: 36,
      courseId: 12,
      rating: 5,
      comment: 'Giảng viên rất nhiệt tình và dễ hiểu.',
      createdAt: new Date('15/02/2024'),
    },
    {
      id: 37,
      courseId: 13,
      rating: 4,
      comment: 'Giảng viên tuyệt vời và bài học dễ hiểu.',
      createdAt: new Date('16/02/2024'),
    },
    {
      id: 38,
      courseId: 13,
      rating: 5,
      comment: 'Khóa học cung cấp kiến thức bổ ích và thực tế.',
      createdAt: new Date('17/02/2024'),
    },
    {
      id: 39,
      courseId: 13,
      rating: 4,
      comment: 'Khóa học rất chi tiết, tuy nhiên có thể thêm ví dụ.',
      createdAt: new Date('18/02/2024'),
    },

    // Reviews cho khóa học 14
    {
      id: 40,
      courseId: 14,
      rating: 3,
      comment: 'Khóa học còn thiếu phần bài tập thực hành.',
      createdAt: new Date('19/02/2024'),
    },
    {
      id: 41,
      courseId: 14,
      rating: 4,
      comment: 'Khóa học cung cấp nhiều kiến thức hay.',
      createdAt: new Date('20/02/2024'),
    },
    {
      id: 42,
      courseId: 14,
      rating: 5,
      comment: 'Giảng viên giảng dạy rất dễ hiểu.',
      createdAt: new Date('21/02/2024'),
    },

    // Reviews cho khóa học 15
    {
      id: 43,
      courseId: 15,
      rating: 4,
      comment: 'Nội dung khóa học khá hay, phù hợp cho người mới bắt đầu.',
      createdAt: new Date('22/02/2024'),
    },
    {
      id: 44,
      courseId: 15,
      rating: 5,
      comment: 'Rất thích khóa học này, có thể áp dụng ngay vào công việc.',
      createdAt: new Date('23/02/2024'),
    },
    {
      id: 45,
      courseId: 15,
      rating: 4,
      comment: 'Khóa học dễ hiểu nhưng cần thêm phần thực hành.',
      createdAt: new Date('24/02/2024'),
    },

    // Reviews cho khóa học 16
    {
      id: 46,
      courseId: 16,
      rating: 5,
      comment: 'Một trong những khóa học hay nhất tôi từng học.',
      createdAt: new Date('25/02/2024'),
    },
    {
      id: 47,
      courseId: 16,
      rating: 4,
      comment: 'Giảng viên rất nhiệt tình và dễ hiểu.',
      createdAt: new Date('26/02/2024'),
    },
    {
      id: 48,
      courseId: 16,
      rating: 3,
      comment: 'Khóa học này cần thêm phần ví dụ thực tế.',
      createdAt: new Date('27/02/2024'),
    },

    // Reviews cho khóa học 17
    {
      id: 49,
      courseId: 17,
      rating: 4,
      comment: 'Khóa học cung cấp nhiều kiến thức bổ ích.',
      createdAt: new Date('28/02/2024'),
    },
    {
      id: 50,
      courseId: 17,
      rating: 5,
      comment: 'Giảng viên giải thích rất dễ hiểu.',
      createdAt: new Date('29/02/2024'),
    },
    {
      id: 51,
      courseId: 17,
      rating: 4,
      comment: 'Khóa học khá hay, có thể cải thiện phần thực hành.',
      createdAt: new Date('01/03/2024'),
    },

    // Reviews cho khóa học 18
    {
      id: 52,
      courseId: 18,
      rating: 5,
      comment: 'Khóa học rất hữu ích và dễ dàng áp dụng vào công việc.',
      createdAt: new Date('02/03/2024'),
    },
    {
      id: 53,
      courseId: 18,
      rating: 4,
      comment: 'Nội dung khóa học đầy đủ nhưng cần thêm bài tập.',
      createdAt: new Date('03/03/2024'),
    },
    {
      id: 54,
      courseId: 18,
      rating: 3,
      comment: 'Khóa học khá ổn, nhưng phần lý thuyết cần ngắn gọn hơn.',
      createdAt: new Date('04/03/2024'),
    },

    // Reviews cho khóa học 19
    {
      id: 55,
      courseId: 19,
      rating: 4,
      comment: 'Khóa học này rất hữu ích và dễ hiểu.',
      createdAt: new Date('05/03/2024'),
    },
    {
      id: 56,
      courseId: 19,
      rating: 5,
      comment: 'Giảng viên rất nhiệt tình và kiến thức cung cấp rất thực tế.',
      createdAt: new Date('06/03/2024'),
    },
    {
      id: 57,
      courseId: 19,
      rating: 4,
      comment: 'Khóa học rất chi tiết, nhưng cần thêm phần bài tập thực hành.',
      createdAt: new Date('07/03/2024'),
    },

    // Reviews cho khóa học 20
    {
      id: 58,
      courseId: 20,
      rating: 5,
      comment: 'Một khóa học tuyệt vời! Tôi đã học được rất nhiều.',
      createdAt: new Date('08/03/2024'),
    },
    {
      id: 59,
      courseId: 20,
      rating: 4,
      comment: 'Khóa học bổ ích nhưng phần lý thuyết hơi dài dòng.',
      createdAt: new Date('09/03/2024'),
    },
    {
      id: 60,
      courseId: 20,
      rating: 3,
      comment: 'Khóa học thiếu phần thực hành thực tế.',
      createdAt: new Date('10/03/2024'),
    },

    // Reviews cho khóa học 21
    {
      id: 61,
      courseId: 21,
      rating: 4,
      comment: 'Giảng viên giảng dạy rất dễ hiểu.',
      createdAt: new Date('11/03/2024'),
    },
    {
      id: 62,
      courseId: 21,
      rating: 5,
      comment: 'Khóa học rất bổ ích, tôi học được nhiều kỹ năng mới.',
      createdAt: new Date('12/03/2024'),
    },
    {
      id: 63,
      courseId: 21,
      rating: 4,
      comment: 'Khóa học rất chi tiết và có thể áp dụng ngay.',
      createdAt: new Date('13/03/2024'),
    },

    // Reviews cho khóa học 22
    {
      id: 64,
      courseId: 22,
      rating: 3,
      comment: 'Khóa học chưa đủ sâu sắc, cần cải thiện phần lý thuyết.',
      createdAt: new Date('14/03/2024'),
    },
    {
      id: 65,
      courseId: 22,
      rating: 4,
      comment: 'Khóa học rất hữu ích nhưng thiếu ví dụ thực tế.',
      createdAt: new Date('15/03/2024'),
    },
    {
      id: 66,
      courseId: 22,
      rating: 5,
      comment:
        'Khóa học cung cấp kiến thức rất tốt, tôi đã học được nhiều điều.',
      createdAt: new Date('16/03/2024'),
    },
    //=================================
<<<<<<< HEAD
    {
      id: 4,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 5,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 6,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 7,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 8,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
  ];
  courses: Course[] = [
    {
      id: 1,
      name: 'Kỹ Năng Giao Tiếp Căn Bản',
      description:
        'Khóa học này dành cho những ai muốn cải thiện kỹ năng giao tiếp cơ bản. Bạn sẽ học cách tạo dựng mối quan hệ, giao tiếp hiệu quả trong môi trường công việc và cuộc sống, từ cách bắt chuyện đến cách duy trì các cuộc trò chuyện mạch lạc và tự tin.',
      instructorId: 1,
      instructorName: 'John Doe',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 29,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 30,
      category: 'communication',
    },
    {
      id: 2,
      name: 'Kỹ Năng Thuyết Trình Hiệu Quả',
      description:
        'Khóa học thuyết trình này giúp bạn nắm vững các kỹ thuật thuyết trình chuyên nghiệp. Bạn sẽ học cách xây dựng bài thuyết trình hấp dẫn, sử dụng ngôn ngữ cơ thể để tạo ấn tượng mạnh mẽ và làm chủ sân khấu dù ở bất kỳ hoàn cảnh nào.',
      instructorId: 2,
      instructorName: 'Jane Smith',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 30,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 45,
      category: 'presentation',
    },
    {
      id: 3,
      name: 'Kỹ Năng Giao Tiếp Nâng Cao',
      description:
        'Khóa học này phù hợp cho những người đã có nền tảng giao tiếp và muốn phát triển kỹ năng giao tiếp nâng cao. Bạn sẽ học cách giao tiếp trong các tình huống phức tạp, giải quyết xung đột và thuyết phục người khác một cách hiệu quả.',
      instructorId: 3,
      instructorName: 'Alice Johnson',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 15,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 25,
      category: 'communication',
    },
=======
>>>>>>> Nam
    {
      id: 4,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 5,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 6,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 7,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
    {
      id: 8,
      courseId: 1,
      rating: 1,
      comment: 'Nguyễn Đại Nam Đẹp Trai!!',
      createdAt: new Date('11/11/2024'),
    },
  ];
<<<<<<< HEAD
  students: Student[] = [
    {
      id: 1,
      name: 'Student 1',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 2,
      name: 'Student 2',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 3,
      name: 'Student 3',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 4,
      name: 'Student 4',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 5,
      name: 'Student 5',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 6,
      name: 'Student 6',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 7,
      name: 'Student 7',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 8,
      name: 'Student 8',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 9,
      name: 'Student 9',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 10,
      name: 'Student 10',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 11,
      name: 'Student 11',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 12,
      name: 'Student 12',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 13,
      name: 'Student 13',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 14,
      name: 'Student 14',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 15,
      name: 'Student 15',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 16,
      name: 'Student 16',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 17,
      name: 'Student 17',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 18,
      name: 'Student 18',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 19,
      name: 'Student 19',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 20,
      name: 'Student 20',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 21,
      name: 'Student 21',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 22,
      name: 'Student 22',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 23,
      name: 'Student 23',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 24,
      name: 'Student 24',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 25,
      name: 'Student 25',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 26,
      name: 'Student 26',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 27,
      name: 'Student 27',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 28,
      name: 'Student 28',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 29,
      name: 'Student 29',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 30,
      name: 'Student 30',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 31,
      name: 'Student 31',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 32,
      name: 'Student 32',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 33,
      name: 'Student 33',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 34,
      name: 'Student 34',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 35,
      name: 'Student 35',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 36,
      name: 'Student 36',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 37,
      name: 'Student 37',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 38,
      name: 'Student 38',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 39,
      name: 'Student 39',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 40,
      name: 'Student 40',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 41,
      name: 'Student 41',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 42,
      name: 'Student 42',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 43,
      name: 'Student 43',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 44,
      name: 'Student 44',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 45,
      name: 'Student 45',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 46,
      name: 'Student 46',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 47,
      name: 'Student 47',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 48,
      name: 'Student 48',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 49,
      name: 'Student 49',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 50,
      name: 'Student 50',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 51,
      name: 'Student 51',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 52,
      name: 'Student 52',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 53,
      name: 'Student 53',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 54,
      name: 'Student 54',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 55,
      name: 'Student 55',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 56,
      name: 'Student 56',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 57,
      name: 'Student 57',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 58,
      name: 'Student 58',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 59,
      name: 'Student 59',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 60,
      name: 'Student 60',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 61,
      name: 'Student 61',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 62,
      name: 'Student 62',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
    {
      id: 63,
      name: 'Student 63',
      avt: '../../../../assets/student/img/team-3.jpg',
    },
    {
      id: 64,
      name: 'Student 64',
      avt: '../../../../assets/student/img/team-4.jpg',
    },
    {
      id: 65,
      name: 'Student 65',
      avt: '../../../../assets/student/img/team-1.jpg',
    },
    {
      id: 66,
      name: 'Student 66',
      avt: '../../../../assets/student/img/team-2.jpg',
    },
  ];
  addReview(newReview: any) {
    this.reviews.push(newReview); // Thêm bình luận vào mảng reviews
    // Nếu bạn đang làm việc với API, bạn có thể gọi API ở đây để lưu vào cơ sở dữ liệu.
    // Ví dụ: return this.http.post('/api/reviews', newReview);
  }
  getAllStudent(): Student[] {
    return this.students;
  }
  getStudentById(id: number): Student[] | undefined {
    return this.students.filter((comment) => comment.id === id);
=======
  addReview(newReview: any) {
    this.reviews.push(newReview);
>>>>>>> Nam
  }
  getAllReview(): Review[] {
    return this.reviews;
  }
  getReviewById(id: number): Review[] | undefined {
    return this.reviews.filter((review) => review.courseId === id);
  }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:5000/api/course/courses');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${'http://localhost:5000/api/course'}/${id}`);
  }
}
