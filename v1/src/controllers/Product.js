const productService = require("../services/Product");

// Tüm ürünleri getirme
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Ürünü ID'ye göre getirme
async function getProductById(req, res) {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);

    if (!product) {
      res.status(404).send("Ürün bulunamadı");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Yeni ürün ekleme
async function createProduct(req, res) {
  try {
    const productData = req.body;
    console.log("CREATE PRODUCT ÇALIŞTI");
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Ürün güncelleme
async function updateProduct(req, res) {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;
    const updatedProduct = await productService.updateProduct(
      productId,
      updatedData
    );

    if (!updatedProduct) {
      res.status(404).send("Ürün bulunamadı");
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Ürün silme
async function deleteProduct(req, res) {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    res.status(200).send(result);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
