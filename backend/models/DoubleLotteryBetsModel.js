const mongoose = require("mongoose");

const DoubleLotteryBetsSchema = new mongoose.Schema(
  {
    gameID: {
      type: Number,
      required: true,
    },
    betID: {
      type: String,
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
    rewardAmount: {
      type: Number,
      default: null,
    },
    winningNumber: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const DoubleLotteryBetsModel = mongoose.model(
  "doubleDigitLotteryBets",
  DoubleLotteryBetsSchema
);
module.exports = DoubleLotteryBetsModel;
