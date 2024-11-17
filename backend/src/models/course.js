const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");  // Sử dụng User thay vì Instructor

const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Tự động tăng
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Dùng TEXT để lưu mô tả dài
      allowNull: true,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Liên kết với bảng User thay vì Instructor
        key: "id",
      },
      onDelete: "CASCADE", // Xóa Course nếu User bị xóa
      validate: {
        isInstructor(value) {
          // Kiểm tra role của User là 'instructor'
          if (value) {
            User.findOne({ where: { id: value, role: 'instructor' } })
              .then(user => {
                if (!user) {
                  throw new Error("User must have role 'instructor'");
                }
              })
              .catch(err => { throw err; });
          }
        },
      },
    },
    number_of_lessons: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number_of_students: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT, // Dùng FLOAT cho điểm đánh giá
      allowNull: true,
    },
    duration: {   //tính theo giờ
      type: DataTypes.INTEGER, // Thời gian khóa học tính theo giờ 
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING, // Đường dẫn đến hình ảnh
      allowNull: true,
    },
    category: { // id khóa ngoại, tạo thêm table category
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Sequelize tự động thêm createdAt và updatedAt
  }
);

// Thiết lập quan hệ
User.hasMany(Course, {
  foreignKey: "instructorId",
  as: "courses",
  scope: {
    role: 'instructor',  // Điều kiện role phải là 'instructor'
  },
});

Course.belongsTo(User, {
  foreignKey: "instructorId",
  as: "instructor",
});

module.exports = Course;
