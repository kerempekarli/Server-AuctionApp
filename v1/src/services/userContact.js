const db = require('../loaders/db');

// Kullanıcının iletişim bilgilerini getirme
async function getUserContactInformation(userId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user_contact_information WHERE UserID = ?';

    db.query(query, [userId], (error, results) => {
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

// Yeni iletişim bilgisi ekle
async function createUserContactInformation(contactData) {
  return new Promise((resolve, reject) => {
    const {
      UserID,
      Email,
      PhoneNumber,
      Address,
      City,
      PostalCode,
      Country,
    } = contactData;
    const query = `
      INSERT INTO user_contact_information (UserID, Email, PhoneNumber, Address, City, PostalCode, Country)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [UserID, Email, PhoneNumber, Address, City, PostalCode, Country],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ ContactID: results.insertId, ...contactData });
        }
      }
    );
  });
}

// Kullanıcının iletişim bilgisini güncelle
async function updateUserContactInformation(userId, updatedData) {
  return new Promise((resolve, reject) => {
    const {
      Email,
      PhoneNumber,
      Address,
      City,
      PostalCode,
      Country,
    } = updatedData;
    const query = `
      UPDATE user_contact_information
      SET Email = ?, PhoneNumber = ?, Address = ?, City = ?, PostalCode = ?, Country = ?
      WHERE UserID = ?
    `;

    db.query(
      query,
      [Email, PhoneNumber, Address, City, PostalCode, Country, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ ContactID: userId, ...updatedData });
        }
      }
    );
  });
}

module.exports = {
  getUserContactInformation,
  createUserContactInformation,
  updateUserContactInformation,
};
