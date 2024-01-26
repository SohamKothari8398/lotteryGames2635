const express = require("express");
const { getAllGiftCards, createGiftCard } = require("../controllers/giftCard");
const {
  getAllUsers,
  getAllAgents,
  createAgent,
  deleteUser,
  userGamesLock,
  userBetsLock,
  activateBets,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.get("/allGiftCards", getAllGiftCards);
router.post("/createGiftCard", createGiftCard);
router.post("/settings/createAgent", createAgent);
router.patch("/settings/gamesLock", userGamesLock);
router.patch("/settings/betsLock", userBetsLock);
router.patch("/settings/betsActivate", activateBets);
router.post("/settings/deleteUser", deleteUser);
router.get("/allUserRecords", getAllUsers);
router.get("/agentsRecords", getAllAgents);
module.exports = router;
