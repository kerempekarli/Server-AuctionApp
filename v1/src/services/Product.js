const db = require("../loaders/db");

// Tüm ürünleri getir
async function getAllProducts() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Products";

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Ürünü ID'ye göre getir
async function getProductById(productId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Products WHERE ProductID = ?";

    db.query(query, [productId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null); // Ürün bulunamadıysa null döner
        } else {
          resolve(results[0]); // İlk bulunan ürünü döner
        }
      }
    });
  });
}

// Yeni ürün ekleme
async function createProduct(productData) {
  return new Promise((resolve, reject) => {
    const {
      Name,
      Description,
      StartingPrice,
      CurrentPrice,
      StartTime,
      EndTime,
      SellerID,
    } = productData;
    const query =
      "INSERT INTO Products (Name, Description, StartingPrice, CurrentPrice, StartTime, EndTime, SellerID) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        Name,
        Description,
        StartingPrice,
        CurrentPrice,
        StartTime,
        EndTime,
        SellerID,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ ProductID: results.insertId, ...productData });
        }
      }
    );
  });
}

// Ürün güncelleme
async function updateProduct(productId, updatedData) {
  return new Promise((resolve, reject) => {
    const {
      Name,
      Description,
      StartingPrice,
      CurrentPrice,
      StartTime,
      EndTime,
      SellerID,
    } = updatedData;
    const query =
      "UPDATE Products SET Name = ?, Description = ?, StartingPrice = ?, CurrentPrice = ?, StartTime = ?, EndTime = ?, SellerID = ? WHERE ProductID = ?";

    db.query(
      query,
      [
        Name,
        Description,
        StartingPrice,
        CurrentPrice,
        StartTime,
        EndTime,
        SellerID,
        productId,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ ProductID: productId, ...updatedData });
        }
      }
    );
  });
}

// Ürün silme
async function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Products WHERE ProductID = ?";

    db.query(query, [productId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Ürün başarıyla silindi");
      }
    });
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
