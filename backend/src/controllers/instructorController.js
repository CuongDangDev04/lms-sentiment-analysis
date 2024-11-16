const Instructor = require("../models/instructor");
const User = require("../models/user");
const { register } = require("../controllers/authController");

// Tạo mới tài khoản instructor
exports.createInstructor = async (req, res) => {
  const { username, password, fullname, email, id } = req.body;
  // Kiểm tra nếu các trường bắt buộc chưa có
  if (!username || !password || !fullname || !email || !id) {
    
    console.log(req.body)
  
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    req.body.role = "instructor"; // Đặt vai trò là 'instructor'
    const registrationResult = await register(req, res); // Gọi phương thức register để tạo tài khoản người dùng

    if (registrationResult.status !== 201) {
      return res.status(500).json({ message: "Failed to register user!" });
    }

    const userId = registrationResult.user.id;

    // Tạo thông tin instructor trong cơ sở dữ liệu
    const instructor = await Instructor.create({
      name: fullname,
      userId,
      avt: req.body.avt || null, // Ảnh đại diện có thể để trống
    });

    res.status(201).json({
      message: "Instructor created successfully!",
      instructor,
      role: registrationResult.user.role,
    });
  } catch (error) {
    console.error("Error creating instructor:", error);
    res.status(500).json({ error: "Failed to create instructor!" });
  }
};

// Lấy danh sách tất cả instructor
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role"], // Bao gồm 'role'
      },
    });

    res.status(200).json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ error: "Failed to retrieve instructors!" });
  }
};

// Lấy chi tiết một instructor theo ID
exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role"], // Bao gồm 'role'
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

// Xóa một instructor theo ID
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["role"], // Bao gồm 'role' để kiểm tra
      },
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Kiểm tra role trước khi xóa
    if (instructor.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can be deleted!" });
    }

    await instructor.destroy();

    res.status(200).json({ message: "Instructor deleted successfully!" });
  } catch (error) {
    console.error("Error deleting instructor:", error);
    res.status(500).json({ error: "Failed to delete instructor!" });
  }
};

// Chỉnh sửa thông tin instructor
exports.editInstructor = async (req, res) => {
  const { id } = req.params;
  const { user, name } = req.body;

  const username = user?.username;
  const email = user?.email;
  const fullname = name;

  if (!username && !email && !fullname) {
    return res.status(400).json({
      message: "At least one field is required to update!",
      fieldsExpected: ["username", "email", "fullname"],
    });
  }

  try {
    const instructor = await Instructor.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role"], // Bao gồm 'role'
      },
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const userToUpdate = instructor.user;

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;

    if (fullname) {
      instructor.name = fullname; // Cập nhật Instructor.name
      userToUpdate.fullname = fullname; // Đồng bộ fullname với User.fullname
    }

    await userToUpdate.save();
    await instructor.save();

    res.status(200).json({
      message: "Instructor updated successfully!",
      instructor: {
        id: instructor.id,
        name: instructor.name,
        role: userToUpdate.role, // Bao gồm 'role'
        user: {
          username: userToUpdate.username,
          email: userToUpdate.email,
          fullname: userToUpdate.fullname,
        },
      },
    });
  } catch (error) {
    console.error("Error updating instructor:", error);
    res.status(500).json({ error: "Failed to update instructor!" });
  }
};
