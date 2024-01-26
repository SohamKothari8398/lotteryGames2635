// routes/promosLinksRoutes.js
const express = require("express");
const router = express.Router();
const {
  changeSliderText,
  getAdsSliderText,
  changeGamesYoutubeLink,
  getAllLinks,
} = require("../controllers/promosLinksController");

router.get("/promoLink", getAdsSliderText);
router.get("/promoLinks", getAllLinks);
router.put("/admin/setThemes/text", changeSliderText);
router.put("/admin/setThemes/link", changeGamesYoutubeLink);

module.exports = router;
