const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Tạo thể loại mới
router.post("/", categoryController.createCategory);

// Lấy tất cả thể loại
router.get("/", categoryController.getAllCategories);

// Lấy thể loại theo ID
router.get("/:id", categoryController.getCategoryById);

// Cập nhật thể loại
router.put("/:id", categoryController.updateCategory);

// Xóa thể loại
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
