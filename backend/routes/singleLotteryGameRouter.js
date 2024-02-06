const express = require("express");
const router = express.Router();
const {
  getAllGames,
  getAllBets,
  createBet,
  getBetsById,
  getRecentBetsById,
} = require("../controllers/singleDigitLotteryController");
const SingleLotteryGameModel = require("../models/SingleLotteryGameModel");

router.get("/games", getAllGames);
// router.get("/allBets", getAllBets);
router.post("/createBet", createBet);
router.get("/bets/:userID", getBetsById);
router.get("/recentBets/:userID", getRecentBetsById);
router.delete("/games/deleteNull", async (req, res) => {
  try {
    const result = await SingleLotteryGameModel.deleteMany({
      $or: [
        { totalBets: null },
        { totalAmount: null },
        { winningNumber: null },
      ],
    });
    console.log(`Deleted ${result.deletedCount} documents.`);
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} documents.` });
  } catch (error) {
    console.error("Error deleting documents:", error.message);
    res.status(500).json({ error: "Failed to delete documents." });
  }
});

module.exports = router;
