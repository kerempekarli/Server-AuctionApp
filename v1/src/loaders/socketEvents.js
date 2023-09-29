const auctions = {};

// Socket.io başlatma fonksiyonu
const initSocket = (io) => {
  console.log("Socket.io çalışıyor.");

  // Yeni bir bağlantı oluşturulduğunda
  io.on("connection", (socket) => {
    // Kullanıcı bir açık artırmaya katılmak istediğinde
    socket.on("joinAuction", (auctionId) => {
      console.log(socket);
      socket.join(auctionId); // Kullanıcıyı belirli bir açık artırma odasına katılmış olarak işaretler
      console.log(`Kullanıcı odaya katıldı: ${auctionId}`);
    });

    // Kullanıcı bir teklif verdiğinde
    socket.on("placeBid", (data) => {
      const auctionId = data.auctionId;
      console.log("Kullanıcı teklif verdi");
      resetAuctionTimer(io, auctionId); // Açık artırma zamanlayıcısını sıfırla
      startAuction(io, auctionId); // Açık artırmayı başlat
    });
  });
};

// Açık artırmayı başlatma fonksiyonu
function startAuction(io, auctionId) {
  console.log("Açık arttırma başlatıldı");
  const countdown = 10;
  auctions[auctionId] = {
    countdown,
    timer: setInterval(() => {
      auctions[auctionId].countdown -= 1;

      // Geri sayım süresini istemcilere bildir
      io.to(auctionId).emit("updateCountdown", {
        countdown: auctions[auctionId].countdown,
      });
      console.log(
        "updateCountdown emit edildi: ",
        auctions[auctionId].countdown
      );

      // Geri sayım sıfırlandığında açık artırmayı sonlandır
      if (auctions[auctionId].countdown === 0) {
        endAuction(io, auctionId);
      }
    }, 1000),
  };
}

// Açık artırmayı sonlandırma fonksiyonu
function endAuction(io, auctionId) {
  clearInterval(auctions[auctionId].timer); // Zamanlayıcıyı temizle
  delete auctions[auctionId]; // Açık artırmayı listeden kaldır
}

// Zamanlayıcıyı sıfırlama fonksiyonu
function resetAuctionTimer(io, auctionId) {
  if (auctions[auctionId]) {
    clearInterval(auctions[auctionId].timer); // Eğer zamanlayıcı varsa temizle
  }
}

module.exports = initSocket;
