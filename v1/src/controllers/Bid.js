const BidServices = require("../services/Bid");

// Tüm teklifleri getirme
const getAllBids = async (req, res) => {
  try {
    const bids = await BidServices.getAllBids();
    res.status(200).json(bids);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
};

// Yeni teklif oluşturma
const createBid = async (req, res) => {
  const { ProductID, BidderID, BidAmount } = req.body;
  try {
    const newBid = await BidServices.createBid(ProductID, BidderID, BidAmount);
    res.status(201).json(newBid);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
};

// Teklif güncelleme
const updateBid = async (req, res) => {
  const bidID = req.params.bidID;
  const { BidAmount } = req.body;
  try {
    const updatedBid = await BidServices.updateBid(bidID, BidAmount);
    res.status(200).json(updatedBid);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
};

// Teklif silme
const deleteBid = async (req, res) => {
  const bidID = req.params.bidID;
  try {
    const result = await BidServices.deleteBid(bidID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
};

module.exports = {
  getAllBids,
  createBid,
  updateBid,
  deleteBid,
};
