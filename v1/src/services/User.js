const db = require("../loaders/db");

// Tüm kullanıcıları getir
async function getAllUsers() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Kullanıcıyı ID'ye göre getir
async function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE UserID = ?";
    db.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null); // Kullanıcı bulunamadıysa null döner
        } else {
          resolve(results[0]); // İlk bulunan kullanıcıyı döner
        }
      }
    });
  });
}

// Yeni kullanıcı oluştur
async function createUser(userData) {
  return new Promise((resolve, reject) => {
    const {
      Username,
      Email,
      Password,
      FirstName,
      LastName,
      DateOfBirth,
      RegistrationDate,
      ActiveStatus,
      EmailVerified,
      ProfilePicture,
      PasswordResetToken,
    } = userData;
    const query =
      "INSERT INTO users (Username, Email, Password, FirstName, LastName, DateOfBirth, RegistrationDate, ActiveStatus, EmailVerified, ProfilePicture, PasswordResetToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        Username,
        Email,
        Password,
        FirstName,
        LastName,
        DateOfBirth,
        RegistrationDate,
        ActiveStatus,
        EmailVerified,
        ProfilePicture,
        PasswordResetToken,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ UserID: results.insertId, ...userData });
        }
      }
    );
  });
}

// Kullanıcı güncelle
async function updateUser(userId, updatedData) {
  return new Promise((resolve, reject) => {
    const {
      Username,
      Email,
      Password,
      FirstName,
      LastName,
      DateOfBirth,
      RegistrationDate,
      ActiveStatus,
      EmailVerified,
      ProfilePicture,
      PasswordResetToken,
    } = updatedData;
    const query =
      "UPDATE users SET Username = ?, Email = ?, Password = ?, FirstName = ?, LastName = ?, DateOfBirth = ?, RegistrationDate = ?, ActiveStatus = ?, EmailVerified = ?, ProfilePicture = ?, PasswordResetToken = ? WHERE UserID = ?";
    db.query(
      query,
      [
        Username,
        Email,
        Password,
        FirstName,
        LastName,
        DateOfBirth,
        RegistrationDate,
        ActiveStatus,
        EmailVerified,
        ProfilePicture,
        PasswordResetToken,
        userId,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ UserID: userId, ...updatedData });
        }
      }
    );
  });
}

// Kullanıcıyı sil
async function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE UserID = ?";
    db.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Kullanıcı başarıyla silindi");
      }
    });
  });
}
// Kullanıcıyı kullanıcı adına göre getir
async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE Username = ?";
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUsername,
};
