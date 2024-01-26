const mongoose = require("mongoose");

const DoubleLotteryGameSchema = new mongoose.Schema(
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
    },
    totalAmount: {
      type: Number,
    },
    winningNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const DoubleLotteryGameModel = mongoose.model(
  "doubleLotteryGame",
  DoubleLotteryGameSchema
);

module.exports = DoubleLotteryGameModel;
