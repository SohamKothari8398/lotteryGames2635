const mongoose = require("mongoose");

const PromosLinksSchema = new mongoose.Schema(
  {
    adsSlider: {
      type: String,
      default:
        "We can use this marquee for special offers, promotions, ads, and updates.",
    },
    singleDigitLotteryYoutubeLink: {
      type: String,
      default:
        "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1",
    },
    doubleDigitLotteryYoutubeLink: {
      type: String,
      default:
        "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1",
    },
    tripleDigitLotteryYoutubeLink: {
      type: String,
      default:
        "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1",
    },
    colorballGameYoutubeLink: {
      type: String,
      default:
        "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1",
    },
    counter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("promosLinks", PromosLinksSchema);
