//validations
//validation middleware

const express = require("express");
const { createCategory, getAllCategories } = require("../controllers/Category");
const router = express.Router();
router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
