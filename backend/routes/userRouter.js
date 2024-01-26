const express = require("express");
const {
  createUser,
  loginUser,
  changePassword,
  changePromoCode,
  changeUpiId,
  depositBalance,
  withdrawBalance,
  getAllAgentUsers,
  blockUser,
  activateUser,
  getWalletBalance,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/login", changePassword);
router.post("/deposit", depositBalance);
router.post("/withdraw", withdrawBalance);
router.put("/user/profile", requireAuth, changeUpiId);
router.put("/agent/settings", requireAuth, changeUpiId);
router.patch("/agent/settings", requireAuth, changePromoCode);
router.patch("/agent/settings/blockUser", blockUser);
router.patch("/agent/settings/activateUser", activateUser);
router.get("/agent/userRecords", getAllAgentUsers);
router.get("/getWalletBalance/:userID", getWalletBalance);

module.exports = router;
