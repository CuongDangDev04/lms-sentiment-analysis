const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Endpoint để lấy tất cả Student
router.get("/", studentController.getAllStudents);

// Endpoint để lấy chi tiết Student theo ID
router.get("/:id", studentController.getStudentById);

// Endpoint để xóa Student theo ID
router.delete("/:id", studentController.deleteStudent);

// Endpoint để tạo mới Student
router.post("/", studentController.createStudent);

router.put("/:id", studentController.updateStudent);
//Endpoint để lấy student từ userId
router.get(
  "/get-student-by-user/:userId",
  studentController.getStudentByUserId
);

router.put("/:id", studentController.editStudent);

module.exports = router;
