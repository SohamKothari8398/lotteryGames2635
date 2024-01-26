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
  },
  winningNumber: {
    type: Number,
  },
  winningColor: {
    type: String,
  },
});

const ColorballBetsModel = mongoose.model("colorballBets", ColorballBetsSchema);
module.exports = ColorballBetsModel;
