const BetsModel1 = require("../models/SingleLotteryBetsModel");
const GameModel1 = require("../models/SingleLotteryGameModel");
const BetsModel2 = require("../models/DoubleLotteryBetsModel");
const GameModel2 = require("../models/DoubleLotteryGameModel");
const BetsModel3 = require("../models/TripleLotteryBetsModel");
const GameModel3 = require("../models/TripleLotteryGameModel");
const BetsModel4 = require("../models/ColorballBetsModel");
const GameModel4 = require("../models/ColorballGameModel");
const UserModel = require("../models/User");
const cron = require("node-cron");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColor() {
  const colorOptions = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Red",
    "Purple",
    "Blue",
    "Yellow",
    "Green",
  ];
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[randomIndex];
}

cron.schedule("20 */1 * * * *", async () => {
  try {
    const games1 = await GameModel1.find();
    const games2 = await GameModel2.find();
    const games3 = await GameModel3.find();
    const games4 = await GameModel4.find();
    if (!games1 || games1.length === 0) await createGame1();
    if (!games2 || games2.length === 0) await createGame2();
    if (!games3 || games3.length === 0) await createGame3();
    if (!games4 || games4.length === 0) await createGame4();
    else {
      await createGame1();
      console.log(
        "Single Digit Lottery Game Request Created at ",
        Math.floor(Date.now() * 1000)
      );
      await createGame2();
      console.log(
        "Double Digit Lottery Game Request Created at ",
        Math.floor(Date.now() * 1000)
      );
      await createGame3();
      console.log(
        "Triple Digit Lottery Game Request Created at ",
        Math.floor(Date.now() * 1000)
      );
      await createGame4();
      console.log(
        "ColorBall Lottery Game Request Created at ",
        Math.floor(Date.now() * 1000)
      );
    }
  } catch (error) {
    console.error("Error creating a new game:", error.message);
  }
});

const createGame1 = async (req, res) => {
  try {
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const lastGame = await GameModel1.findOne(
      {},
      {},
      { sort: { endTime: -1 } }
    );
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
      const newGame = new GameModel1({
        gameID: currentTimestamp,
        gameTimer: 300,
        pauseTime: 60,
        endTime: currentTimestamp + 360,
      });
      await newGame.save();
      await updateBetsAndGame1(newGame.gameID);
    }
  } catch (error) {
    console.error("Error creating a new game:", error.message);
    if (res) {
      res.status(500).json({ error: "Failed to create a new game." });
    }
  }
};

const createGame2 = async (req, res) => {
  try {
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const lastGame = await GameModel2.findOne(
      {},
      {},
      { sort: { endTime: -1 } }
    );
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
      const newGame = new GameModel2();
      newGame.gameID = currentTimestamp;
      newGame.gameTimer = 600;
      newGame.pauseTime = 150;
      newGame.endTime = currentTimestamp + 750;
      await newGame.save();
      await updateBetsAndGame2(newGame.gameID);
    }
  } catch (error) {
    if (res) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error creating a new game:", error.message);
    }
  }
};

const createGame3 = async (req, res) => {
  try {
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const lastGame = await GameModel3.findOne(
      {},
      {},
      { sort: { endTime: -1 } }
    );
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
      const newGame = new GameModel3({
        gameID: currentTimestamp,
        gameTimer: 1200,
        pauseTime: 150,
        endTime: currentTimestamp + 1350,
      });
      await newGame.save();
      await updateBetsAndGame3(newGame.gameID);
    }
  } catch (error) {
    console.error("Error creating a new game:", error.message);
    if (res) {
      res.status(500).json({ error: "Failed to create a new game." });
    }
  }
};

const createGame4 = async (req, res) => {
  try {
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    const lastGame = await GameModel4.findOne(
      {},
      {},
      { sort: { endTime: -1 } }
    );
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
      const newGame = new GameModel4();
      newGame.gameID = currentTimestamp;
      newGame.gameTimer = 900;
      newGame.pauseTime = 300;
      newGame.endTime = currentTimestamp + 1200;
      await newGame.save();
      console.log("Color Ball Game Created at", Math.floor(Date.now() * 1000));
      await updateBetsAndGame4(newGame.gameID);
    }
  } catch (error) {
    if (res) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error creating a new game:", error.message);
    }
  }
};

const updateBetsAndGame1 = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel1.findOne().sort({ createdAt: -1 });
    if (!gameToUpdate) {
      console.error("Game not found");
      return;
    }
    setTimeout(async () => {
      try {
        console.log(getRandomNumber(0, 9));
        gameToUpdate.winningNumber = getRandomNumber(0, 9);
        await gameToUpdate.save();
        const betsToUpdate = await BetsModel1.find({ gameID: gameIdToUpdate });
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

const updateBetsAndGame2 = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel2.findOne({
      gameID: gameIdToUpdate,
    });
    if (!gameToUpdate) {
      console.error("Game not found");
      return;
    }
    setTimeout(async () => {
      try {
        gameToUpdate.winningNumber = getRandomNumber(0, 99);
        await gameToUpdate.save();
        const betsToUpdate = await BetsModel2.find({ gameID: gameIdToUpdate });
        for (const bet of betsToUpdate) {
          bet.winningNumber = gameToUpdate.winningNumber;
          if (bet.betNumber === gameToUpdate.winningNumber) {
            bet.rewardAmount = 88 * bet.betAmount;
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
          "Double Digit Lottery Game Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
      } catch (error) {
        console.error("Error updating game and bets:", error.message);
      }
    }, 12 * 60 * 1000 + 50 * 1000);
  } catch (error) {
    console.error("Error fetching game for update:", error.message);
  }
};

const updateBetsAndGame3 = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel3.findOne({
      gameID: gameIdToUpdate,
    });
    if (!gameToUpdate) {
      console.error("Game not found");
      return;
    }
    setTimeout(async () => {
      try {
        gameToUpdate.winningNumber = getRandomNumber(0, 999);
        await gameToUpdate.save();
        const betsToUpdate = await BetsModel3.find({ gameID: gameIdToUpdate });
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

const updateBetsAndGame4 = async (gameIdToUpdate) => {
  try {
    const gameToUpdate = await GameModel4.findOne({
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
        const betsToUpdate = await BetsModel4.find({ gameID: gameIdToUpdate });
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
          "ColorBall Game Updated Successfully",
          Math.floor(Date.now() * 1000)
        );
      } catch (error) {
        console.error("Error updating game and bets:", error.message);
      }
    }, 20 * 60 * 1000 + 10 * 1000);
  } catch (error) {
    console.error("Error fetching game for update:", error.message);
  }
};
