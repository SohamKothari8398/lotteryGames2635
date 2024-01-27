const GameModel = require("../models/ColorballGameModel");
const BetsModel = require("../models/ColorballBetsModel");
const UserModel = require("../models/User");
const cron = require("node-cron");

function generateRandomNumber() {
  return Math.floor(Math.random() * 36 + 1);
}

function generateRandomColor() {
  const colorOptions = [
    "Red",
    "Red",
    "Blue",
    "Blue",
    "Green",
    "Green",
    "Yellow",
    "Yellow",
    "Purple",
    "Purple",
  ];
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[randomIndex];
}

// Cron Timer every 1 minute 20 seconds
// Game Timer every 12 minutes 30 seconds create new game
// Update Game and Bets after 10 minutes 30 seconds

cron.schedule("10 */1 * * * *", async () => {
  try {
    const games = await GameModel.find();
    if (!games || games.length === 0) await createGame();
    else {
      await createGame();
    }
    console.log(
      "Color Ball Game Request Created at",
      Math.floor(Date.now() * 1000)
    );
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
        console.error(`New game will start after ${timeRemaining} seconds`);
      }
    }
    if (
      !lastGame ||
      (lastGame && currentTimestamp >= Math.floor(lastGame.endTime))
    ) {
      const newGame = new GameModel();
      newGame.gameID = currentTimestamp;
      newGame.gameTimer = 900;
      newGame.pauseTime = 300;
      newGame.endTime = currentTimestamp + 1200;
      newGame.winningNumber = null;
      newGame.winningColor = "No Color";
      newGame.totalBets = null;
      newGame.totalAmount = null;
      await newGame.save();
      console.log("Color Ball Game Created at", Math.floor(Date.now() * 1000));
      await updateBetsAndGame(newGame.gameID);
    }
  } catch (error) {
    if (res) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error creating a new game:", error.message);
    }
  }
};

// Get all Games
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

// Get all bets
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

// Create a new bet
const createBet = async (req, res) => {
  const { userID, betNumber, betColor, betAmount } = req.body;
  if (!userID || !betNumber || !betColor || !betAmount) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (betNumber < 1 || betNumber > 36) {
    return res.status(400).json({ error: "Choose a number from 1 to 36" });
  }
  const allowedColors = ["Red", "Blue", "Green", "Yellow", "Purple"];
  if (!allowedColors.includes(betColor)) {
    return res.status(400).json({
      error:
        "Invalid betColor. Choose from Red, Blue, Green, Yellow, or Purple",
    });
  }
  if (betAmount <= 99) {
    return res
      .status(400)
      .json({ error: "Bet amount must be greater than or equal to 100." });
  }
  try {
    const game = await GameModel.findOne().sort({ createdAt: -1 });
    const user = await UserModel.findOne({ userID });
    if (!game) return res.status(404).json({ error: "No active game found" });
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
    newGame.betColor = betColor;
    newGame.rewardAmount = null;
    newGame.winningNumber = null;
    newGame.winningColor = "No color";
    user.walletBalance -= betAmount;
    game.totalBets += 1;
    game.totalAmount += betAmount;
    await newGame.save();
    await game.save();
    await user.save();
    res.status(201).json({
      status: "Bet Placed",
      newGame,
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
        gameToUpdate.winningNumber = generateRandomNumber();
        gameToUpdate.winningColor = generateRandomColor();
        await gameToUpdate.save();
        console.log(
          "ColorBall Game Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
        const betsToUpdate = await BetsModel.find({ gameID: gameIdToUpdate });
        betsToUpdate.forEach(async (bet) => {
          bet.winningNumber = gameToUpdate.winningNumber;
          bet.winningColor = gameToUpdate.winningColor;
          if (
            bet.betNumber === gameToUpdate.winningNumber &&
            bet.betColor === gameToUpdate.winningColor
          ) {
            bet.rewardAmount = 160 * bet.betAmount;
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
          "ColorBall Bets Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
        // console.log("Game:", gameToUpdate, "\nBets:", betsToUpdate);
      } catch (error) {
        console.error("Error updating game and bets:", error.message);
      }
    }, 20 * 60 * 1000 + 10 * 1000);
  } catch (error) {
    console.error("Error fetching game for update:", error.message);
  }
};

module.exports = {
  getAllGames,
  getAllBets,
  getBetsById,
  createBet,
  getRecentBetsById,
};

// // Update bets after 15 minutes
// const updateBets = async (gameIdToUpdate) => {
//   try {
//     const gameToUpdate = await GameModel.findOne({
//       gameID: gameIdToUpdate,
//     });
//     if (!gameToUpdate) {
//       console.error("Game not found");
//       return;
//     }
//     setTimeout(async () => {
//       try {
//         const betsToUpdate = await BetsModel.find({ gameID: gameIdToUpdate });
//         betsToUpdate.forEach(async (bet) => {
//           bet.winningNumber = gameToUpdate.winningNumber;
//           bet.winningColor = gameToUpdate.winningColor;
//           if (
//             bet.betNumber === gameToUpdate.winningNumber &&
//             bet.betColor === gameToUpdate.winningColor
//           ) {
//             bet.rewardAmount = 200 * bet.betAmount;
//           } else {
//             bet.rewardAmount = 0;
//           }
//           await bet.save();
//         });
//         console.log("Bets updated successfully");
//       } catch (error) {
//         console.error("Error updating bets:", error.message);
//       }
//     }, 5 * 60 * 1000);
//   } catch (error) {
//     console.error("Error fetching game for bets update:", error.message);
//   }
// };

// const updateGame = async (gameIdToUpdate) => {
//   try {
//     const gameToUpdate = await GameModel.findOne({
//       gameID: gameIdToUpdate,
//     });
//     if (!gameToUpdate) {
//       console.error("Game not found");
//       return;
//     }
//     setTimeout(async () => {
//       try {
//         gameToUpdate.winningNumber = generateRandomNumber();
//         gameToUpdate.winningColor = generateRandomColor();
//         await gameToUpdate.save();
//         console.log("Game updated successfully");
//       } catch (error) {
//         console.error("Error updating game:", error.message);
//       }
//     }, 5 * 60 * 1000);
//   } catch (error) {
//     console.error("Error fetching game for game update:", error.message);
//   }
// };
