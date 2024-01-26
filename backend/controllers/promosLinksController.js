const PromosLinksModel = require("../models/PromosLinks");

const changeSliderText = async (req, res) => {
  const adsSliderText = req.body.adsSliderText; // Assuming the property name is adsSliderText
  try {
    let promoLinks = await PromosLinksModel.findOne();
    if (!promoLinks) {
      promoLinks = new PromosLinksModel(); // Create a new document if none exists
    }
    promoLinks.adsSlider = adsSliderText;
    await promoLinks.save(); // Save changes
    return res.status(200).json({ status: "Updated Slider Text" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Error -> ${err}`);
  }
};

const changeGamesYoutubeLink = async (req, res) => {
  const { gameName, yotubeVideoLink } = req.body;
  try {
    let promoLinks = await PromosLinksModel.findOne();
    if (!promoLinks) {
      promoLinks = new PromosLinksModel(); // Create a new document if none exists
    }
    if (gameName === "Single Digit Lottery") {
      promoLinks.singleDigitLotteryYoutubeLink = yotubeVideoLink;
    }
    if (gameName === "Double Digit Lottery") {
      promoLinks.doubleDigitLotteryYoutubeLink = yotubeVideoLink;
    }
    if (gameName === "Triple Digit Lottery") {
      promoLinks.tripleDigitLotteryYoutubeLink = yotubeVideoLink;
    }
    if (gameName === "ColourBall Game") {
      promoLinks.colorballGameYoutubeLink = yotubeVideoLink;
    }
    await promoLinks.save();
    return res.status(200).json({ status: "Game Link Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error => ${error}`);
  }
};

// Add a new controller function to fetch adsSliderText
const getAdsSliderText = async (req, res) => {
  try {
    const promoLinks = await PromosLinksModel.findOne(); // Assuming you want to fetch the first document
    if (!promoLinks) {
      return res.status(404).json("Promo not found");
    }
    const adsSliderText = promoLinks.adsSlider;
    return res.status(200).json({ adsSliderText });
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Error -> ${err}`);
  }
};

const getAllLinks = async (req, res) => {
  try {
    const promoLinks = await PromosLinksModel.findOne();
    if (!promoLinks) {
      return res.status(404).json("Promo not found");
    }
    const allLinks = {
      singleDigitLottery: promoLinks.singleDigitLotteryYoutubeLink,
      doubleDigitLottery: promoLinks.doubleDigitLotteryYoutubeLink,
      tripleDigitLottery: promoLinks.tripleDigitLotteryYoutubeLink,
      colorballGame: promoLinks.colorballGameYoutubeLink,
    };
    return res.status(200).json(allLinks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Error -> ${err}`);
  }
};

module.exports = {
  changeSliderText,
  getAdsSliderText,
  changeGamesYoutubeLink,
  getAllLinks,
};
