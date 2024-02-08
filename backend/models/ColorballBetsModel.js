const mongoose = require("mongoose");

const ColorballBetsSchema = new mongoose.Schema({
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
});

const ColorballBetsModel = mongoose.model("colorballBets", ColorballBetsSchema);
module.exports = ColorballBetsModel;
