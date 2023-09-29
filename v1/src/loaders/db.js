const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // Bağlantı havuzunda kaç bağlantı oluşturulacağını belirtin
});

// Bağlantı havuzundan bir bağlantı alın
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Veritabanı bağlantısı alınamadı:", err);
    return;
  }
  console.log("Veritabanı bağlantısı alındı.");

  // Bağlantıyı kullanarak sorguları çalıştırabilirsiniz

  // Bağlantıyı geri verin
  connection.release();
});

module.exports = pool;
