const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController"); 

// Endpoint để lấy tất cả Instructor
router.get("/", instructorController.getAllInstructors);

// Endpoint để lấy chi tiết Instructor theo ID
router.get("/:id", instructorController.getInstructorById);

// Endpoint để xóa Instructor theo ID
router.delete("/:id", instructorController.deleteInstructor);

router.post("/", instructorController.createInstructor);
router.put("/:id", instructorController.updateInstructor);

module.exports = router;
