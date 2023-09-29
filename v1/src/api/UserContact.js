const express = require("express");
const UserContactController = require("../controllers/userContact");
const router = express.Router();

// Kullanıcının iletişim bilgilerini getirme
router.get("/:userId", UserContactController.getUserContactInformation);

// Kullanıcının iletişim bilgisini güncelleme
router.put("/:userId", UserContactController.updateUserContactInformation);

module.exports = router;
