const express = require("express");
const router = express.Router();
const {
  getAllGames,
  createBet,
  getAllBets,
  getRecentBetsById,
  getBetsById,
} = require("../controllers/doubleDigitLotteryController");

router.get("/games", getAllGames);
// router.get("/allBets", getAllBets);
router.post("/createBet", createBet);
router.get("/bets/:userID", getBetsById);
router.get("/recentBets/:userID", getRecentBetsById);
module.exports = router;
