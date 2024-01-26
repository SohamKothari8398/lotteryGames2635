require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const TransactionModel = require("../models/Transactions");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({ role: { $ne: "admin" } }).sort({
    createdAt: -1,
  });
  res.status(200).json(users);
};
const getAllAgents = async (req, res) => {
  const users = await UserModel.find({ role: "agent" }).sort({
    createdAt: -1,
  });
  res.status(200).json(users);
};

const getAllAgentUsers = async (req, res) => {
  const { promoCode } = req.query;
  try {
    const users = await UserModel.find(
      { promoCode, role: "user" },
      {
        userID: 1,
        mobileNumber: 1,
        promoCode: 1,
        giftCard: 1,
        walletBalance: 1,
        createdAt: 1,
        accountStatus: 1,
        gamesPlayed: 1,
        gamesWon: 1,
        gamesActive: 1,
        gamesLoss: 1,
        _id: 0,
      }
    );
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: "No users found with the specified promo code" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching agent users:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const createUser = async (req, res) => {
  const { userID, mobileNumber, password, promoCode } = req.body;
  try {
    const checkMobile = await UserModel.findOne({ mobileNumber });
    if (checkMobile) {
      console.log("Mobile Already Registered.");
      return res
        .status(400)
        .json({ error: "Mobile number already registered" });
    }
    const existingUser = await UserModel.findOne({ userID });
    if (existingUser) {
      console.log("User Already Registered.");
      return res.status(400).json({ error: "Try another userID" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      userID,
      mobileNumber,
      password: hash,
      promoCode,
    });
    const token = createToken(user._id);
    res.status(200).json({ userID, token, status: "Success" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const createAgent = async (req, res) => {
  const {
    userID,
    mobileNumber,
    password,
    promoCode,
    upiID,
    commission,
    share,
  } = req.body;
  try {
    const checkMobile = await UserModel.findOne({ mobileNumber });
    if (checkMobile) {
      return res.status(400).json({ error: "Mobile Number Not Available" });
    }
    const existingUser = await UserModel.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Registered." });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      userID,
      mobileNumber,
      password: hash,
      promoCode,
      share,
      commission,
      upiID,
      role: "agent",
    });
    const token = createToken(user._id);
    res.status(200).json({ userID, token, status: "Success", role: user.role });
  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userID, password } = req.body;
  try {
    const user = await UserModel.login(userID, password);
    const token = createToken(user._id);
    res.status(200).json({
      userID,
      mobileNumber: user.mobileNumber,
      Status: "Success",
      role: user.role,
      promoCode: user.promoCode,
      walletBalance: user.walletBalance,
      games: user.games,
      bets: user.bets,
      accountStatus: user.accountStatus,
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      gamesActive: user.gamesActive,
      gamesLoss: user.gamesLoss,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { mobileNumber, otp, newPassword } = req.body;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    if (newPassword.length < 8) {
      return res.status(400).json({
        error:
          "Backend Error: Password should be a minimum of 8 characters long.",
      });
    }
    const user = await UserModel.findOne({ mobileNumber });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const otpResponse = user.otp == otp;
    if (otpResponse === false) {
      return res.status(401).json({ error: "Put the correct OTP" });
    }
    user.password = hashedNewPassword;
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    console.log("Password updated successfully");
    return res.json({
      status: "Password updated successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Password change failed:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation Error: Check input fields" });
    }
    return res
      .status(500)
      .json({ error: "Failed to update password. Please try again." });
  }
};

const changeUpiId = async (req, res) => {
  try {
    const { mobileNumber, otp, newUpiID } = req.body;
    if (newUpiID.length < 13) {
      return res.status(400).json({
        error:
          "Backend Error: UPI-ID should be a minimum of 14 characters long.\n 1234567890@upi",
      });
    }
    const user = await UserModel.findOne({ mobileNumber });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const otpResponse = user.otp == otp;
    if (otpResponse === false) {
      return res.status(401).json({ error: "Put the correct OTP" });
    }
    user.upiID = newUpiID;
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    return res.json({
      status: "UPI Details Updated",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in changeUpiId:", error);
    return res.status(500).json({
      error: "Failed to update UPI details. Please try again.",
      details: error.message,
    });
  }
};

const depositBalance = async (req, res) => {
  const { userID, mobileNumber, amount } = req.body;
  try {
    console.log(userID, mobileNumber, amount);
    const findUser = await UserModel.findOne({ userID });
    const balance = findUser.walletBalance;
    if (!findUser) {
      return res.status(404).json({ message: "UserID not found" });
    }
    if (findUser.mobileNumber !== mobileNumber) {
      return res.status(400).json({ message: "Invalid Mobile Number" });
    }

    const transactionDeposit = await TransactionModel.createTxn(
      userID,
      mobileNumber,
      balance,
      amount,
      "Deposit"
    );
    const token = createToken(findUser._id);
    return res.status(200).json({
      userID,
      mobileNumber,
      balance,
      token,
      transactionDeposit,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const withdrawBalance = async (req, res) => {
  const { userID, mobileNumber, otp, amount } = req.body;
  if (!userID || !mobileNumber || !otp || !amount) {
    return res.status(400).json({ message: "All Fields Are Requied" });
  }
  try {
    console.log(userID, mobileNumber, otp, amount);
    const findUser = await UserModel.findOne({ userID });
    const balance = findUser.walletBalance;
    if (!findUser) {
      return res.status(404).json({ message: "UserID not found" });
    }
    if (findUser.mobileNumber !== mobileNumber) {
      return res.status(400).json({ message: "Invalid Mobile Number" });
    }
    if (findUser.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (amount > balance) {
      return res
        .status(400)
        .json({ message: "Insufficient Wallet Balance.\nDeposit Funnds!!!" });
    }
    const transactionWithdraw = await TransactionModel.createTxn(
      userID,
      mobileNumber,
      balance,
      amount,
      "Withdraw"
    );
    const token = createToken(findUser._id);
    return res.status(200).json({
      userID,
      mobileNumber,
      balance,
      token,
      transactionWithdraw,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const changePromoCode = async (req, res) => {
  try {
    const { mobileNumber, otp, newPromoCode } = req.body;
    const user = await UserModel.findOne({ mobileNumber });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const otpResponse = user.otp == otp;
    if (otpResponse === false) {
      return res.status(401).json({ error: "Put the correct OTP" });
    }
    user.promoCode = newPromoCode;
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    return res.json({
      status: "Promo Code Updated",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in changePromoCode:", error);
    return res.status(500).json({
      error: "Failed to update Promo Code. Please try again.",
      details: error.message,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.accountStatus = "blocked";
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      status: "User blocked successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in blockUser:", error);
    res.status(500).json({
      error: "Failed to block user. Please try again.",
      details: error.message,
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.accountStatus = "active";
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      status: "User blocked successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in activate user account :", error);
    res.status(500).json({
      error: "Failed to activate user account. Please try again.",
      details: error.message,
    });
  }
};
const userGamesLock = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.games = "blocked";
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      status: "User blocked successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in lockUser:", error);
    res.status(500).json({
      error: "Failed to lock user. Please try again.",
      details: error.message,
    });
  }
};
const userBetsLock = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.bets = "blocked";
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      status: "User blocked successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in blockUser:", error);
    res.status(500).json({
      error: "Failed to block user. Please try again.",
      details: error.message,
    });
  }
};

const activateBets = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.bets = "active";
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      status: "User Activated Successfully",
      role: user.role,
    });
  } catch (error) {
    console.error("Error in activatingUser:", error);
    res.status(500).json({
      error: "Failed to activate user. Please try again.",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userID, mobileNumber } = req.body;
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.remove();
    res.json({
      status: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({
      error: "Failed to delete user. Please try again.",
      details: error.message,
    });
  }
};

const getWalletBalance = async (req, res) => {
  const userId = req.params.userID;
  try {
    const user = await UserModel.findOne({ userID: userId });
    if (!user) {
      // console.log(user, userId);
      return res
        .status(404)
        .json({ error: "User not found. Unable to retrieve wallet balance." });
    }
    const walletBalance = user.walletBalance;
    res.status(200).json({ userId, walletBalance });
  } catch (error) {
    console.error("Error in getWalletBalance:", error);
    res.status(500).json({
      error:
        "Server Error. Failed to retrieve wallet balance. Please try again later.",
      details: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllAgents,
  createUser,
  createAgent,
  loginUser,
  changePassword,
  changeUpiId,
  depositBalance,
  withdrawBalance,
  changePromoCode,
  getAllAgentUsers,
  blockUser,
  deleteUser,
  activateUser,
  userBetsLock,
  userGamesLock,
  activateBets,
  getWalletBalance,
};
