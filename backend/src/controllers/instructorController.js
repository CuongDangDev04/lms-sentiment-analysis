const  Instructor = require("../models/instructor"); 
const  User = require("../models/user"); 

const { register } = require("../controllers/authController"); // Import phương thức register từ controller người dùng

exports.createInstructor = async (req, res) => {
  const { username, password, fullname, email, id } = req.body;

  // Kiểm tra nếu các trường bắt buộc chưa có
  if (!username || !password || !fullname || !email || !id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Gọi phương thức register để tạo tài khoản người dùng
  req.body.role = 'instructor'; // Xác định vai trò là instructor
  const registrationResult = await register(req, res); // Gọi register để tạo tài khoản người dùng

  if (registrationResult.status !== 201) {
    return res.status(500).json({ message: "Failed to register user!" });
  }

  // Trả về thông báo thành công sau khi đăng ký tài khoản người dùng
  res.status(201).json({
    message: "Instructor created successfully!",
    user: registrationResult.user,
  });
};



exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      include: {
        model: User, // Liên kết với bảng User để lấy thông tin user
        as: "user",
        attributes: ["id", "username", "email"], // Chỉ lấy một số thuộc tính của User
      },
    }); 
    res.status(200).json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ error: "Failed to retrieve instructors!" });
  }
};

// Lấy chi tiết Instructor theo ID
exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const instructor = await Instructor.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
    });
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ error: "Failed to retrieve instructor!" });
  }
};

// Xóa Instructor theo ID
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    await instructor.destroy(); // Xóa Instructor
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("Error deleting instructor:", error);
    res.status(500).json({ error: "Failed to delete instructor!" });
  }
};
exports.editInstructor = async (req, res) => {
    const { id } = req.params; // Lấy id từ params
    const { user, name } = req.body; // Lấy thông tin từ request body
  
    const username = user?.username; // Trích xuất username từ user
    const email = user?.email; // Trích xuất email từ user
    const fullname = name; // Ánh xạ name thành fullname
  
    // Kiểm tra nếu không có trường nào cần cập nhật
    if (!username && !email && !fullname) {
      return res.status(400).json({
        message: "At least one field is required to update!",
        fieldsExpected: ["username", "email", "fullname"],
      });
    }
  
    try {
      // Tìm Instructor bao gồm User liên kết
      const instructor = await Instructor.findByPk(id, {
        include: {
          model: User,
          as: "user",
        },
      });
  
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
  
      // Cập nhật User
      const userToUpdate = instructor.user;
      if (username) userToUpdate.username = username;
      if (email) userToUpdate.email = email;
  
      // Cập nhật Instructor và đồng bộ fullname với User.fullname
      if (fullname) {
        instructor.name = fullname; // Cập nhật Instructor.name
        userToUpdate.fullname = fullname; // Đồng bộ fullname với User.fullname
      }
  
      // Lưu User trước để đảm bảo tính toàn vẹn dữ liệu
      await userToUpdate.save();
  
      // Lưu Instructor sau khi cập nhật
      await instructor.save();
  
      res.status(200).json({
        message: "Instructor updated successfully!",
        instructor,
        user: userToUpdate,
      });
    } catch (error) {
      console.error("Error updating instructor:", error);
      res.status(500).json({ error: "Failed to update instructor!" });
    }
  };
  