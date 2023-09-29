const express = require("express");
const RoleController = require("../controllers/role");
const router = express.Router();

// Tüm rolleri getirme
router.get("/", RoleController.getAllRoles);

// Rolü ID'ye göre getirme
router.get("/:roleId", RoleController.getRoleById);

// Yeni rol oluşturma
router.post("/", RoleController.createRole);

// Rolü güncelleme
router.put("/:roleId", RoleController.updateRole);

// Rolü silme
router.delete("/:roleId", RoleController.deleteRole);

module.exports = router;
