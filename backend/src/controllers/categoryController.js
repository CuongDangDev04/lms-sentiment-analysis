const Category = require("../models/category");  // Import model Category

// Tạo mới thể loại
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    // Kiểm tra xem tên thể loại có tồn tại không
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // Tạo mới thể loại
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả thể loại
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy thể loại theo ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;  
  try {
    const category = await Category.findByPk(id); 
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật thể loại
exports.updateCategory = async (req, res) => {
  const { id } = req.params;  
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);  
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Kiểm tra xem tên thể loại có tồn tại không
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // Cập nhật tên thể loại
    category.name = name || category.name;

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa thể loại
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;  
  try {
    const category = await Category.findByPk(id);  
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
