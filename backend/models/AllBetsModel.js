const mongoose = require("mongoose");
const AllBetsSchema = new mongoose.Schema(
  {
    betID: {
      type: String,
      required: true,
    },
    gameID: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    betTime: {
      type: Number,
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    betNumber: {
      type: Number,
      required: true,
    },
    betColor: {
      type: String,
      required: true,
    },
    rewardAmount: {
      type: Number,
    },
    winningNumber: {
      type: Number,
    },
    winningColor: {
      type: String,
    },
  },
  { timestamps: true }
);

// AllBetsSchema.statics.createAbet = async function (
//   fromUser,
//   toUser,
//   giftCardID,
//   amount
// ) {
//   if (!fromUser || !toUser || !giftCardID || !amount) {
//     throw new Error("All Fields are required");
//   }
//   return await this.create({ fromUser, toUser, giftCardID, amount });
// };

const AllBetsModel = mongoose.model("allBetsData", AllBetsSchema);
module.exports = AllBetsModel;
