const db = require("../loaders/db");

// Tüm rolleri getir
async function getAllRoles() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Roles";

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Rolü ID'ye göre getir
async function getRoleById(roleId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Roles WHERE RoleID = ?";

    db.query(query, [roleId], (error, results) => {
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

// Yeni rol ekle
async function createRole(roleData) {
  console.log("CREATE ROLE ÇALIŞTI");
  return new Promise((resolve, reject) => {
    const { RoleName, Description } = roleData;
    const query = "INSERT INTO Roles (RoleName, Description) VALUES (?, ?)";

    db.query(query, [RoleName, Description], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ RoleID: results.insertId, ...roleData });
      }
    });
  });
}

// Rolü güncelle
async function updateRole(roleId, updatedData) {
  return new Promise((resolve, reject) => {
    const { RoleName, Description } = updatedData;
    const query =
      "UPDATE Roles SET RoleName = ?, Description = ? WHERE RoleID = ?";

    db.query(query, [RoleName, Description, roleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ RoleID: roleId, ...updatedData });
      }
    });
  });
}

// Rolü sil
async function deleteRole(roleId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Roles WHERE RoleID = ?";

    db.query(query, [roleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve("Rol başarıyla silindi");
      }
    });
  });
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
