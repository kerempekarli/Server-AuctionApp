const UserService = require("../services/User"); // Kullanıcı işlemleri için servis modülünü içe aktarıyoruz
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
// Tüm kullanıcıları getir
async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Kullanıcılar getirilirken bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Kullanıcıyı ID'ye göre getir
async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await UserService.getUserById(userId);

    if (!user) {
      res.status(404).send("Kullanıcı bulunamadı");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Kullanıcı getirilirken bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Yeni kullanıcı oluştur
async function createUser(req, res) {
  try {
    const userData = req.body;
    const saltRounds = 10; // Karma işlemi için kullanılacak tuz sayısı
    const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);

    // Parola yerine, hashedPassword'i kullanarak yeni kullanıcı oluşturun
    const newUser = await UserService.createUser({
      ...userData,
      Password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Kullanıcı oluşturulurken bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Kullanıcıyı güncelle
async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const updatedUser = await UserService.updateUser(userId, updatedData);

    if (!updatedUser) {
      res.status(404).send("Kullanıcı bulunamadı");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Kullanıcı güncellenirken bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}

// Kullanıcıyı sil
async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    const result = await UserService.deleteUser(userId);
    res.status(200).send(result);
  } catch (error) {
    console.error("Kullanıcı silinirken bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}
async function loginUser(req, res) {
  try {
    const { Username, Password } = req.body;
    let user = await UserService.getUserByUsername(Username);

    if (!user) {
      res.status(404).send("Kullanıcı bulunamadı");
      return;
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (passwordMatch) {
      user = {
        ...user,
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
      delete user.Password;

      res.status(200).json({ message: "Giriş başarılı", user: user });
    } else {
      res.status(401).send("Parola doğrulanamadı");
    }
  } catch (error) {
    console.error("Kullanıcı girişi sırasında bir hata oluştu:", error);
    res.status(500).send("Bir hata oluştu");
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
