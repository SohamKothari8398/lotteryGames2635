const mongoose = require("mongoose");

const SingleLotteryGameSchema = new mongoose.Schema(
  {
    gameID: {
      type: Number,
      required: true,
    },
    gameTimer: {
      type: Number,
      required: true,
    },
    pauseTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    totalBets: {
      type: Number,
      default: null,
    },
    totalAmount: {
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

const SingleLotteryGameModel = mongoose.model(
  "singleLotteryGame",
  SingleLotteryGameSchema
);

module.exports = SingleLotteryGameModel;
