const mongoose = require("mongoose");

const TripleLotteryBetsSchema = new mongoose.Schema(
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
    rewardAmount: {
      type: Number,
    },
    winningNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const TripleLotteryBetsModel = mongoose.model(
  "tripleDigitLotteryBets",
  TripleLotteryBetsSchema
);
module.exports = TripleLotteryBetsModel;
