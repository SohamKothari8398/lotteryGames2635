const BetsModel = require("../models/TripleLotteryBetsModel");
const GameModel = require("../models/TripleLotteryGameModel");
const UserModel = require("../models/User");
const cron = require("node-cron");

function generateRandomTripleDigit() {
  return Math.floor(Math.random() * 1000);
}

// Cron Timer every 1 minute 30 seconds
// Game Timer every 22 minutes 30 seconds create new game
// Update Game and Bets after 20 minutes 15 seconds

cron.schedule("10 */1 * * * *", async () => {
  try {
    const games = await GameModel.find();
    if (!games || games.length === 0) await createGame();
    else {
      await createGame();
      console.log(
        "Triple Digit Lottery Game Request Created at ",
        Math.floor(Date.now() * 1000)
      );
    }
  } catch (error) {
    console.error("Error creating a new game:", error.message);
  }
});

const createGame = async (req, res) => {
  try {
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const lastGame = await GameModel.findOne({}, {}, { sort: { endTime: -1 } });
    if (lastGame && currentTimestamp < Math.floor(lastGame.endTime)) {
      const timeRemaining = Math.floor(lastGame.endTime - currentTimestamp);
      if (res) {
        return res.status(400).json({
          error: `New game will start after ${timeRemaining} seconds`,
        });
      } else {
        console.log(`New game will start after ${timeRemaining} seconds`);
        return;
      }
    }
    if (
      !lastGame ||
      (lastGame && currentTimestamp >= Math.floor(lastGame.endTime))
    ) {
      const newGame = new GameModel({
        gameID: currentTimestamp,
        gameTimer: 1200,
        pauseTime: 150,
        endTime: currentTimestamp + 1350,
      });
      await newGame.save();
      await updateBetsAndGame(newGame.gameID);
    }
  } catch (error) {
    console.error("Error creating a new game:", error.message);
    if (res) {
      res.status(500).json({ error: "Failed to create a new game." });
    }
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await GameModel.find();
    if (!games || games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBets = async (req, res) => {
  try {
    const games = await BetsModel.find();
    if (!games || games.length === 0) {
      return res.status(404).json({ message: "No Bets found" });
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBet = async (req, res) => {
  const { userID, betNumber, betAmount } = req.body;
  if (!userID || !betAmount) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (betNumber < 0 || betNumber > 999) {
    return res
      .status(400)
      .json({ error: "Invalid betNumber. It should be between 0 to 999." });
  }
  if (betAmount <= 99) {
    return res
      .status(400)
      .json({ error: "Bet amount must be greater than or equal to 100." });
  }
  try {
    const game = await GameModel.findOne().sort({ createdAt: -1 });
    const user = await UserModel.findOne({ userID });
    if (!game) {
      return res.status(400).json({ error: "No active game found" });
    }
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.walletBalance < betAmount)
      return res
        .status(400)
        .json({ error: "Insufficient Balance Please Add Money." });
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const newGame = new BetsModel();
    newGame.gameID = game.gameID;
    newGame.betID = userID + ":" + currentTimestamp;
    newGame.userID = userID;
    newGame.betTime = currentTimestamp;
    newGame.betAmount = betAmount;
    newGame.betNumber = betNumber;
    game.totalBets += 1;
    game.totalAmount += betAmount;
    user.walletBalance -= betAmount;
    await user.save();
    await game.save();
    await newGame.save();
    res.status(201).json({
      status: "Bet Placed",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBetsById = async (req, res) => {
  const userId = req.params.userID;
  try {
    const userBets = await BetsModel.find({ userID: userId });

    if (!userBets || userBets.length === 0) {
      return res.status(404).json({
        error: "No Bets Found.\nPlace Bets.",
        message: "No Bets found for the specified user",
      });
    }
    res.status(200).json(userBets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentBetsById = async (req, res) => {
  const userId = req.params.userID;
  const currentGame = await GameModel.findOne().sort({ endTime: -1 });
  if (!currentGame) {
    return res.status(404).json({ message: "No active games found" });
  }
  const recentBets = await BetsModel.find({
    gameID: currentGame.gameID,
    userID: userId,
  });
  if (!recentBets || recentBets.length === 0) {
    return res.status(400).json({
      error: "No Bets Found.\nPlace Bets.",
      message: "No bets found for the specified user and current game",
    });
  }
  res.status(200).json(recentBets);
};

const updateBetsAndGame = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel.findOne({
      gameID: gameIdToUpdate,
    });
    if (!gameToUpdate) {
      console.error("Game not found");
      return;
    }
    setTimeout(async () => {
      try {
        gameToUpdate.winningNumber = generateRandomTripleDigit();
        await gameToUpdate.save();
        const betsToUpdate = await BetsModel.find({ gameID: gameIdToUpdate });
        betsToUpdate.forEach(async (bet) => {
          bet.winningNumber = gameToUpdate.winningNumber;
          if (bet.betNumber === gameToUpdate.winningNumber) {
            bet.rewardAmount = 888 * bet.betAmount;
            const user = await UserModel.findOne({ userID: bet.userID });
            if (!user) {
              console.error("User Not Found");
            }
            user.walletBalance += bet.rewardAmount;
            await user.save();
          } else {
            bet.rewardAmount = 0;
          }
          await bet.save();
        });
        console.log(
          "Triple Digit Lottery Game Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
      } catch (error) {
        console.error("Error updating game and bets:", error.message);
      }
    }, 23 * 60 * 1000 + 10 * 1000);
  } catch (error) {
    console.error("Error fetching game for update:", error.message);
  }
};

module.exports = {
  getAllGames,
  getAllBets,
  createBet,
  getBetsById,
  getRecentBetsById,
};
