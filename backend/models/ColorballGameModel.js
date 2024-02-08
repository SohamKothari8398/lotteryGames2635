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
    winningColor: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ColorballGameModel = mongoose.model("colorBallGame", ColorballGameSchema);

module.exports = ColorballGameModel;
