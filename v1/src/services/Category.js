const pool = require("../loaders/db"); // Veritabanı bağlantısını içe aktarın

// Tüm kategorileri getir (Promise ile)
function getAllCategories() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM categories"; // Kategori tablosundan veri çekme sorgusu

    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Yeni kategori oluştur (Promise ile)
function createCategory(categoryName) {
  return new Promise((resolve, reject) => {
    if (!categoryName) {
      return reject("Kategori adı gereklidir");
    }

    const query = "INSERT INTO categories (CategoryName) VALUES (?)"; // Yeni kategori oluşturma sorgusu
    const values = [categoryName];

    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ CategoryID: results.insertId, CategoryName: categoryName });
      }
    });
  });
}

module.exports = {
  getAllCategories,
  createCategory,
};
