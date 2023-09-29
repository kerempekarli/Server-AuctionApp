function checkRoles(allowedRoles) {
  return (req, res, next) => {
    const userRoles = req.user.roles; // Kullanıcının rollerini alın (req.user.roles şeklinde varsayalım)

    // Kullanıcının rolleri ile izin verilen rolleri karşılaştırın
    const authorized = userRoles.some((role) => allowedRoles.includes(role));

    if (!authorized) {
      return res
        .status(403)
        .send("Bu işlemi gerçekleştirmek için gerekli izne sahip değilsiniz");
    }

    next(); // İzin verildiğinde sonraki middleware'e veya işleme devam edin
  };
}

module.exports = checkRoles;
//checkRoles(['Admin']) şekilde kullanılır.
