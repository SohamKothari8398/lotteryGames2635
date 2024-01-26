const GiftCardModel = require("../models/GiftCard");
const UserModel = require("../models/User");

const createGiftCard = async (req, res) => {
  try {
    const { fromUser, toUser, amount } = req.body;
    if (!fromUser || !toUser || !amount) {
      return res.status(400).json({
        error: "All Fields are required",
        message: "All Fields are required",
      });
    }
    const adminOnly = await UserModel.findOne({ role: "admin" });
    if (adminOnly.userID != fromUser) {
      return res.status(400).json({
        error: "Only Admin Can Use this Function",
        message: "Only Admin Can Use this Function",
      });
    }
    const userExists = await UserModel.findOne({ userID: toUser });
    if (!userExists) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const admin = await UserModel.findOne({ role: "admin" });
    if (!admin) return res.status(404).json({ error: "Admin Not Found" });
    const gcID = `${Date.now()}:${toUser}&${amount}`;
    const giftCard = await GiftCardModel.createGiftCard(
      fromUser,
      toUser,
      gcID,
      amount
    );
    await giftCard.save();
    userExists.walletBalance += giftCard.amount;
    await userExists.save();
    admin.walletBalance += giftCard.amount;
    await admin.save();
    return res.status(201).json({
      id: giftCard.giftCardID,
      toUser: giftCard.toUser,
      amount: giftCard.amount,
      createdAt: giftCard.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllGiftCards = async (req, res) => {
  try {
    const giftCards = await GiftCardModel.find();
    if (giftCards.length === 0) {
      return res.status(200).json({ message: "No gift cards found" });
    }
    return res.status(200).json(giftCards);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGiftCard,
  getAllGiftCards,
};
