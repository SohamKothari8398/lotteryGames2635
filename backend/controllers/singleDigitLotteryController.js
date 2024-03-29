const BetsModel = require("../models/SingleLotteryBetsModel");
const GameModel = require("../models/SingleLotteryGameModel");
const UserModel = require("../models/User");
const cron = require("node-cron");

function generateRandomSingleDigit() {
  return Math.floor(Math.random() * 10);
}

// Cron Timer every 1 minute 5 seconds
// Game Timer every 6 minutes new Game
// Update Game and Bets after 6 minutes 5 seconds

// cron.schedule("5 */1 * * * *", async () => {
//   try {
//     const games = await GameModel.find();
//     if (!games || games.length === 0) await createGame();
//     else {
//       await createGame();
//       console.log(
//         "Single Digit Lottery Game Created at :",
//         Math.floor(Date.now() * 1000)
//       );
//     }
//   } catch (error) {
//     console.error("Error creating a new game:", error.message);
//   }
// });

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
        gameTimer: 300,
        pauseTime: 60,
        endTime: currentTimestamp + 360,
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

const updateBetsAndGame = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel.findOne().sort({ createdAt: -1 });
    if (!gameToUpdate) {
      console.error("Game not found");
      return;
    }
    setTimeout(async () => {
      try {
        console.log(generateRandomSingleDigit());
        gameToUpdate.winningNumber = generateRandomSingleDigit();
        await gameToUpdate.save();
        const betsToUpdate = await BetsModel.find({ gameID: gameIdToUpdate });
        for (const bet of betsToUpdate) {
          bet.winningNumber = gameToUpdate.winningNumber;
          if (bet.betNumber === gameToUpdate.winningNumber) {
            bet.rewardAmount = 8 * bet.betAmount;
            const user = await UserModel.findOne({ userID: bet.userID });
            if (!user) {
              console.error("User Not Found");
              continue;
            }
            user.walletBalance += bet.rewardAmount;
            await user.save();
          } else {
            bet.rewardAmount = 0;
          }
          await bet.save();
        }
        console.log(
          "Single Digit Lottery Game Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
      } catch (error) {
        console.error("Error updating game and bets:", error.message);
      }
    }, 6 * 60 * 1000 + 5 * 1000);
  } catch (error) {
    console.error("Error fetching game for update:", error.message);
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await GameModel.find();
    if (!games || games.length === 0) {
      return res
        .status(404)
        .json({ error: error.message, message: "No games found" });
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBets = async (req, res) => {
  try {
    const bets = await BetsModel.find();
    if (!bets || bets.length === 0) {
      return res
        .status(404)
        .json({ error: error.message, message: "No Bets found" });
    }
    res.status(200).json(bets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBet = async (req, res) => {
  const { userID, betNumber, betAmount } = req.body;
  if (!userID || !betAmount) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (betNumber < 0 || betNumber > 9) {
    return res
      .status(400)
      .json({ error: "Invalid betNumber. It should be between 0 to 9." });
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
    if (user.walletBalance < betAmount) {
      return res
        .status(400)
        .json({ error: "Insufficient Balance. Please Add Money." });
    }
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const newGame = new BetsModel();
    newGame.gameID = game.gameID;
    newGame.betID = userID + ":" + currentTimestamp;
    newGame.userID = userID;
    newGame.betTime = currentTimestamp;
    newGame.betAmount = betAmount;
    newGame.betNumber = betNumber;
    await newGame.save();
    game.totalBets += 1;
    game.totalAmount += betAmount;
    user.walletBalance -= betAmount;
    await game.save();
    await user.save();
    res.status(201).json({
      status: "Bet Placed",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error("Error placing a bet:", error.message);
    res
      .status(500)
      .json({ error: "Failed to place the bet. Please try again later." });
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

const deleteAllNull = async (req, res) => {
  try {
    const latestGame = await GameModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    const gamesToDelete = await GameModel.find({
      _id: { $ne: latestGame._id }, // Exclude the latest game
      totalBets: null,
      totalAmount: null,
    });
    if (!gamesToDelete || gamesToDelete.length === 0) {
      return res.status(404).json({ message: "No games found to delete." });
    }
    for (const game of gamesToDelete) {
      await game.deleteOne();
    }

    console.log(
      `Deleted ${gamesToDelete.length} games where totalBets and totalAmount are null`
    );
    res
      .status(200)
      .json({ message: `Deleted ${gamesToDelete.length} games successfully.` });
  } catch (error) {
    console.error("Error deleting games:", error.message);
    res.status(500).json({ error: "Failed to delete games." });
  }
};

module.exports = {
  getAllGames,
  getAllBets,
  createBet,
  getBetsById,
  getRecentBetsById,
  deleteAllNull,
};
