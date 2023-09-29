const RoleService = require("../services/role");

// Tüm rolleri getirme
async function getAllRoles(req, res) {
  try {
    const roles = await RoleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Rolü ID'ye göre getirme
async function getRoleById(req, res) {
  try {
    const roleId = req.params.roleId;
    const role = await RoleService.getRoleById(roleId);

    if (!role) {
      res.status(404).send("Rol bulunamadı");
    } else {
      res.status(200).json(role);
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Yeni rol ekleme
async function createRole(req, res) {
  try {
    const roleData = req.body;
    const newRole = await RoleService.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Rolü güncelleme
async function updateRole(req, res) {
  try {
    const roleId = req.params.roleId;
    const updatedData = req.body;
    const updatedRole = await RoleService.updateRole(roleId, updatedData);

    if (!updatedRole) {
      res.status(404).send("Rol bulunamadı");
    } else {
      res.status(200).json(updatedRole);
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Rolü silme
async function deleteRole(req, res) {
  try {
    const roleId = req.params.roleId;
    const result = await RoleService.deleteRole(roleId);
    res.status(200).send(result);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
