const mongoose = require("mongoose");
const GamesConfigSchema = new mongoose.Schema(
  {
    _1DLotteryDuration: {
      type: Number, // in seconds
      default: 900,
    },
    _2DLotteryDuration: {
      type: Number, // in seconds
      default: 900,
    },
    _3DLotteryDuration: {
      type: Number, // in seconds
      default: 900,
    },
    colorBallDuration: {
      type: Number, // in seconds
      default: 900,
    },
    _1DLotteryReward: {
      type: Number, // in seconds
      default: 8,
    },
    _2DLotteryReward: {
      type: Number, // in seconds
      default: 88,
    },
    _3DLotteryReward: {
      type: Number, // in seconds
      default: 888,
    },
    colorBallReward: {
      type: Number, // in seconds
      default: 200,
    },
  },
  { timestamps: true }
);

const GamesConfigModel = mongoose.model("gamesConfig", GamesConfigSchema);
module.exports = GamesConfigModel;
