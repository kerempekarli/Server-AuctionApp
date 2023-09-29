const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");
const router = express.Router();

// Tüm ürünleri getirme
router.get("/", getAllProducts);

// Ürünü ID'ye göre getirme 
router.get("/:productId", getProductById);

// Yeni ürün oluşturma
router.post("/", createProduct);

// Ürün güncelleme
router.put("/:productId", updateProduct);

// Ürün silme
router.delete("/:productId", deleteProduct);

module.exports = router;
