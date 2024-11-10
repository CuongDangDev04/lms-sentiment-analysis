import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
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
    {
      id: 4,
      name: 'Quản Lý Dự Án Cơ Bản',
      description:
        'Khóa học này sẽ giúp bạn hiểu rõ các nguyên lý cơ bản trong quản lý dự án, từ việc lập kế hoạch đến việc theo dõi và đánh giá hiệu quả công việc. Bạn sẽ học được cách sử dụng các công cụ và phương pháp quản lý dự án để đảm bảo dự án được triển khai thành công.',
      instructorId: 4,
      instructorName: 'David Brown',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 53,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 50,
      category: 'project_management',
    },
    {
      id: 5,
      name: 'Thiết Kế UX/UI cho Người Mới',
      description:
        'Khóa học cung cấp cho bạn các kiến thức cơ bản về thiết kế UX/UI, từ cách nghiên cứu người dùng đến việc thiết kế giao diện người dùng trực quan. Bạn sẽ học cách tạo ra các sản phẩm thiết kế đáp ứng nhu cầu của người dùng và tối ưu hóa trải nghiệm người dùng.',
      instructorId: 5,
      instructorName: 'Emily Davis',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 24,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 60,
      category: 'design',
    },
    {
      id: 6,
      name: 'Marketing Online 101',
      description:
        'Khóa học này là bước đầu tiên để bạn hiểu rõ về marketing trực tuyến. Bạn sẽ học các chiến lược marketing cơ bản như SEO, SEM, và sử dụng mạng xã hội để quảng bá sản phẩm, dịch vụ và xây dựng thương hiệu trực tuyến.',
      instructorId: 6,
      instructorName: 'Michael Scott',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 52,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 35,
      category: 'marketing',
    },
    {
      id: 7,
      name: 'Quản Lý Thời Gian Hiệu Quả',
      description:
        'Khóa học này giúp bạn học cách quản lý thời gian hiệu quả. Bạn sẽ tìm hiểu cách ưu tiên công việc, sắp xếp thời gian hợp lý và đối mặt với áp lực công việc để đạt được kết quả tối ưu trong cuộc sống cá nhân và công việc.',
      instructorId: 7,
      instructorName: 'Sarah Lee',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 12,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 40,
      category: 'personal_development',
    },
    {
      id: 8,
      name: 'Kỹ Năng Đàm Phán',
      description:
        'Khóa học này giúp bạn hiểu rõ về các kỹ thuật đàm phán, từ việc xây dựng chiến lược đàm phán đến cách ứng xử trong quá trình đàm phán để đạt được kết quả có lợi cho tất cả các bên tham gia.',
      instructorId: 8,
      instructorName: 'Chris Martin',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 23,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 55,
      category: 'communication',
    },
    {
      id: 9,
      name: 'Phân Tích Dữ Liệu Cơ Bản',
      description:
        'Khóa học này cung cấp các kiến thức nền tảng về phân tích dữ liệu, bao gồm các phương pháp thu thập, xử lý và trực quan hóa dữ liệu. Bạn sẽ học cách sử dụng các công cụ và phần mềm phân tích dữ liệu cơ bản để đưa ra các quyết định thông minh trong công việc.',
      instructorId: 9,
      instructorName: 'Alex Turner',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 12,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 65,
      category: 'data_analysis',
    },
    {
      id: 10,
      name: 'Lập Trình Web với JavaScript',
      description:
        'Khóa học này sẽ dạy bạn các kỹ năng lập trình web cơ bản bằng JavaScript. Bạn sẽ học cách xây dựng trang web động, xử lý sự kiện, và tạo ra các tính năng tương tác để người dùng có thể trải nghiệm trên trình duyệt.',
      instructorId: 10,
      instructorName: 'Olivia Wang',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 14,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 80,
      category: 'programming',
    },
    {
      id: 11,
      name: 'Học Python cho Người Mới',
      description:
        'Khóa học này dành cho những người mới bắt đầu học lập trình. Bạn sẽ làm quen với Python, một trong những ngôn ngữ lập trình phổ biến nhất hiện nay. Khóa học sẽ bao gồm các bài học về cú pháp cơ bản, cấu trúc dữ liệu và lập trình hướng đối tượng.',
      instructorId: 11,
      instructorName: 'Liam Nguyen',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 15,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 50,
      category: 'programming',
    },
    {
      id: 12,
      name: 'Kỹ Năng Giải Quyết Vấn Đề',
      description:
        'Khóa học này sẽ trang bị cho bạn các phương pháp và kỹ thuật giải quyết vấn đề một cách hiệu quả. Bạn sẽ học cách xác định vấn đề, phân tích tình huống, và tìm ra các giải pháp tối ưu để ứng dụng vào công việc và cuộc sống.',
      instructorId: 12,
      instructorName: 'Sophia Tran',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 24,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 45,
      category: 'personal_development',
    },
    {
      id: 13,
      name: 'Thiết Kế Đồ Họa Cơ Bản',
      description:
        'Khóa học thiết kế đồ họa này sẽ giúp bạn hiểu các nguyên lý cơ bản của thiết kế, bao gồm cách sử dụng màu sắc, phông chữ và bố cục trong thiết kế đồ họa. Bạn cũng sẽ học cách sử dụng các phần mềm thiết kế phổ biến để tạo ra các sản phẩm đồ họa chất lượng.',
      instructorId: 13,
      instructorName: 'Noah Lee',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 15,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 70,
      category: 'design',
    },
    {
      id: 14,
      name: 'Phân Tích Tài Chính',
      description:
        'Khóa học này sẽ cung cấp các kiến thức cơ bản về phân tích tài chính, bao gồm cách đọc báo cáo tài chính, phân tích chỉ số tài chính và đánh giá hiệu quả tài chính của một doanh nghiệp. Bạn sẽ học cách sử dụng các công cụ và phương pháp tài chính để ra quyết định đầu tư và quản lý tài chính.',
      instructorId: 14,
      instructorName: 'Emma Kim',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 23,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 55,
      category: 'finance',
    },
    {
      id: 15,
      name: 'Thành Công trong Bán Hàng',
      description:
        'Khóa học này giúp bạn nâng cao kỹ năng bán hàng, bao gồm việc xây dựng mối quan hệ với khách hàng, thuyết phục khách hàng và chốt đơn thành công. Bạn sẽ học các chiến lược bán hàng từ cơ bản đến nâng cao để đạt được hiệu quả tối ưu.',
      instructorId: 15,
      instructorName: 'Ethan Park',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 24,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 60,
      category: 'sales',
    },
    {
      id: 16,
      name: 'Kỹ Năng Giao Tiếp Căn Bản',
      description:
        'Khóa học này dành cho những ai muốn cải thiện kỹ năng giao tiếp cơ bản. Bạn sẽ học cách tạo dựng mối quan hệ, giao tiếp hiệu quả trong môi trường công việc và cuộc sống, từ cách bắt chuyện đến cách duy trì các cuộc trò chuyện mạch lạc và tự tin.',
      instructorId: 1,
      instructorName: 'John Doe',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 14,
      imageUrl: '../../../../assets/student/img/course-1.jpg',
      studentsCount: 30,
      category: 'communication',
    },
    {
      id: 17,
      name: 'Kỹ Năng Thuyết Trình Hiệu Quả',
      description:
        'Khóa học thuyết trình này giúp bạn nắm vững các kỹ thuật thuyết trình chuyên nghiệp. Bạn sẽ học cách xây dựng bài thuyết trình hấp dẫn, sử dụng ngôn ngữ cơ thể để tạo ấn tượng mạnh mẽ và làm chủ sân khấu dù ở bất kỳ hoàn cảnh nào.',
      instructorId: 2,
      instructorName: 'Jane Smith',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 24,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 45,
      category: 'presentation',
    },
    {
      id: 18,
      name: 'Kỹ Năng Giao Tiếp Nâng Cao',
      description:
        'Khóa học này phù hợp cho những người đã có nền tảng giao tiếp và muốn phát triển kỹ năng giao tiếp nâng cao. Bạn sẽ học cách giao tiếp trong các tình huống phức tạp, giải quyết xung đột và thuyết phục người khác một cách hiệu quả.',
      instructorId: 3,
      instructorName: 'Alice Johnson',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 34,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 25,
      category: 'communication',
    },
    {
      id: 19,
      name: 'Quản Lý Dự Án Cơ Bản',
      description:
        'Khóa học này sẽ giúp bạn hiểu rõ các nguyên lý cơ bản trong quản lý dự án, từ việc lập kế hoạch đến việc theo dõi và đánh giá hiệu quả công việc. Bạn sẽ học được cách sử dụng các công cụ và phương pháp quản lý dự án để đảm bảo dự án được triển khai thành công.',
      instructorId: 4,
      instructorName: 'David Brown',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 23,
      imageUrl: '../../../../assets/student/img/course-3.jpg',
      studentsCount: 50,
      category: 'project_management',
    },
    {
      id: 20,
      name: 'Thiết Kế UX/UI cho Người Mới',
      description:
        'Khóa học cung cấp cho bạn các kiến thức cơ bản về thiết kế UX/UI, từ cách nghiên cứu người dùng đến việc thiết kế giao diện người dùng trực quan. Bạn sẽ học cách tạo ra các sản phẩm thiết kế đáp ứng nhu cầu của người dùng và tối ưu hóa trải nghiệm người dùng.',
      instructorId: 5,
      instructorName: 'Emily Davis',
      number_of_lessons: 4,
      number_of_students: 120000,
      certificate: true,
      rating: 4,
      duration: 12,
      imageUrl: '../../../../assets/student/img/course-2.jpg',
      studentsCount: 60,
      category: 'design',
    },
  ];

  getAllReview(): Review[] {
    return this.reviews;
  }
  getReviewById(id: number): Review[] | undefined {
    return this.reviews.filter((review) => review.courseId === id);
  }
  getAllCourse(): Course[] {
    return this.courses;
  }
  getCourseById(id: number): Course | undefined {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      console.log(`No course found with id: ${id}`);
    }
    return course;
  }
  constructor() {}
}
