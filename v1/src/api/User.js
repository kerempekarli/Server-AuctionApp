const express = require("express");
const UserController = require("../controllers/User"); // UserController'ı içe aktarıyoruz

const router = express.Router();

// Tüm kullanıcıları getirme
router.get("/", UserController.getAllUsers);

// Kullanıcıyı ID'ye göre getirme
router.get("/:userId", UserController.getUserById);

// Yeni kullanıcı oluşturma
router.post("/", UserController.createUser);

// Kullanıcıyı güncelleme
router.put("/:userId", UserController.updateUser);

// Kullanıcıyı silme
router.delete("/:userId", UserController.deleteUser);

// Kullanıcı girişi
router.post("/login", UserController.loginUser);

module.exports = router;
