const UserContactService = require('../services/userContact');

// Kullanıcının iletişim bilgilerini getirme
async function getUserContactInformation(req, res) {
  try {
    const userId = req.params.userId;
    const contactInfo = await UserContactService.getUserContactInformation(userId);

    if (!contactInfo) {
      res.status(404).send('Kullanıcı iletişim bilgisi bulunamadı');
    } else {
      res.status(200).json(contactInfo);
    }
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).send('Bir hata oluştu');
  }
}

// Kullanıcının iletişim bilgisini güncelleme
async function updateUserContactInformation(req, res) {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const updatedContactInfo = await UserContactService.updateUserContactInformation(
      userId,
      updatedData
    );

    if (!updatedContactInfo) {
      res.status(404).send('Kullanıcı iletişim bilgisi bulunamadı');
    } else {
      res.status(200).json(updatedContactInfo);
    }
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).send('Bir hata oluştu');
  }
}

module.exports = {
  getUserContactInformation,
  updateUserContactInformation,
};
