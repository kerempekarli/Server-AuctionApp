const pool = require("../loaders/db"); // Veritabanı bağlantısını içe aktarın

// Tüm teklifleri getir (Promise ile)
function getAllBids() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM bids"; // Teklif tablosundan veri çekme sorgusu

    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Yeni teklif oluştur (Promise ile)
function createBid(productID, bidderID, bidAmount) {
  return new Promise((resolve, reject) => {
    if (!productID || !bidderID || !bidAmount) {
      return reject("Ürün ID, Teklif Veren ID ve Teklif Miktarı gereklidir");
    }

    const query =
      "INSERT INTO bids (ProductID, BidderID, BidAmount) VALUES (?, ?, ?)"; // Yeni teklif oluşturma sorgusu
    const values = [productID, bidderID, bidAmount];

    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          BidID: results.insertId,
          ProductID: productID,
          BidderID: bidderID,
          BidAmount: bidAmount,
        });
      }
    });
  });
}

// Teklif güncelleme (Promise ile)
function updateBid(bidID, bidAmount) {
  return new Promise((resolve, reject) => {
    if (!bidID || !bidAmount) {
      return reject("Teklif ID ve Teklif Miktarı gereklidir");
    }

    const query = "UPDATE bids SET BidAmount = ? WHERE BidID = ?"; // Teklif güncelleme sorgusu
    const values = [bidAmount, bidID];

    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows === 0) {
          reject("Teklif bulunamadı");
        } else {
          resolve({ BidID: bidID, BidAmount: bidAmount });
        }
      }
    });
  });
}

// Teklif silme (Promise ile)
function deleteBid(bidID) {
  return new Promise((resolve, reject) => {
    if (!bidID) {
      return reject("Teklif ID gereklidir");
    }

    const query = "DELETE FROM bids WHERE BidID = ?"; // Teklif silme sorgusu
    const values = [bidID];

    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows === 0) {
          reject("Teklif bulunamadı");
        } else {
          resolve({ message: "Teklif başarıyla silindi" });
        }
      }
    });
  });
}

module.exports = {
  getAllBids,
  createBid,
  updateBid,
  deleteBid,
};
