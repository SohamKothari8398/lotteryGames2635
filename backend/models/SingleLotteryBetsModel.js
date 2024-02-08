const mongoose = require("mongoose");

const SingleLotteryBetsSchema = new mongoose.Schema(
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
      default: null,
    },
    winningNumber: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const SingleLotteryBetsModel = mongoose.model(
  "singleDigitLotteryBets",
  SingleLotteryBetsSchema
);
module.exports = SingleLotteryBetsModel;
