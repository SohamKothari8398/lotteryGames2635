const mongoose = require("mongoose");
const GiftCardSchema = new mongoose.Schema(
  {
    fromUser: {
      type: String,
      required: true,
    },
    toUser: {
      type: String,
      required: true,
    },
    giftCardID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Static Register
GiftCardSchema.statics.createGiftCard = async function (
  fromUser,
  toUser,
  giftCardID,
  amount
) {
  if (!fromUser || !toUser || !giftCardID || !amount) {
    throw new Error("All Fields are required");
  }
  return await this.create({ fromUser, toUser, giftCardID, amount });
};

const GiftCardModel = mongoose.model("giftCards", GiftCardSchema);
module.exports = GiftCardModel;
