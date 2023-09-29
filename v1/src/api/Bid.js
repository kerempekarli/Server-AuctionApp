const express = require("express");
const router = express.Router();
const bidController = require("../controllers/Bid"); // Teklif işlemlerini kontrol eden controller dosyasını içe aktarın

// Tüm teklifleri getirme
router.get("/", bidController.getAllBids);

// Yeni teklif oluşturma
router.post("/", bidController.createBid);

// Teklif güncelleme
router.put("/:bidID", bidController.updateBid);

// Teklif silme
router.delete("/:bidID", bidController.deleteBid);

module.exports = router;
