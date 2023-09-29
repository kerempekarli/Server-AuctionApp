const categoryService = require("../services/Category"); // Kategori servisi

// Tüm kategorileri getir
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Kategoriler getirilirken hata oluştu:", error);
    res.status(500).json({ error: "Kategoriler getirilirken hata oluştu" });
  }
};

// Yeni kategori oluştur
const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ error: "Kategori adı gereklidir" });
  }

  try {
    const newCategory = await categoryService.createCategory(categoryName);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Kategori oluşturulurken hata oluştu:", error);
    res.status(500).json({ error: "Kategori oluşturulurken hata oluştu" });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
