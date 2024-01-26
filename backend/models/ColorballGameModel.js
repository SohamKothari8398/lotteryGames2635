const mongoose = require("mongoose");

const ColorballGameSchema = new mongoose.Schema(
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
    winningColor: {
      type: String,
    },
  },
  { timestamps: true }
);

const ColorballGameModel = mongoose.model("colorBallGame", ColorballGameSchema);

module.exports = ColorballGameModel;
