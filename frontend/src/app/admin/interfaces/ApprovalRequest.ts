export  default interface ApprovalRequest {
    id: number;              // ID của yêu cầu phê duyệt
    instructorId: number;    // ID của giảng viên
    adminId: number;         // ID của quản trị viên
    status: 'pending' | 'approved' | 'rejected';  // Trạng thái yêu cầu phê duyệt
  }
  