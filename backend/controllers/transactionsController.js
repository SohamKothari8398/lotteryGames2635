const TransactionModel = require("../models/Transactions");
const UserModel = require("../models/User");

const getAllDeposit = async (req, res) => {
  try {
    const depositTransactions = await TransactionModel.find({
      transactionType: "Deposit",
    }).sort({ createdAt: -1 });
    res.status(200).json(depositTransactions);
  } catch (error) {
    console.error("Error fetching deposit transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllWithdrawal = async (req, res) => {
  try {
    const withdrawalTransactions = await TransactionModel.find({
      transactionType: "Withdraw",
    }).sort({ createdAt: -1 });
    res.status(200).json(withdrawalTransactions);
  } catch (error) {
    console.error("Error fetching withdrawal transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDeposit = async (req, res) => {
  const { transactionID } = req.params;
  const { status, adminRemarks } = req.body;
  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionID
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    if (status === "Received") {
      const admin = await UserModel.findOne({ role: "admin" });
      if (!admin) return res.status(404).json({ error: "Admin Not Found" });
      const user = await UserModel.findOne({
        userID: updatedTransaction.userId,
      });
      if (!user) return res.status(404).json({ error: "User Not Found" });
      user.walletBalance += updatedTransaction.amount;
      admin.walletBalance += updatedTransaction.amount;
      await user.save();
      await admin.save();
    }
    updatedTransaction.status = status;
    updatedTransaction.adminRemarks = adminRemarks;
    await updatedTransaction.save();
    res.status(200).json({ status: "Transaction Success" });
  } catch (error) {
    console.error("Error updating deposit transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateWithdraw = async (req, res) => {
  const { transactionID } = req.params;
  const { status, adminRemarks } = req.body;
  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionID
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    if (status === "Success") {
      const admin = await UserModel.findOne({ role: "admin" });
      if (!admin) res.status.json({ error: "Admin Not Found" });
      const user = await UserModel.findOne({
        userID: updatedTransaction.userId,
      });
      if (!user) res.status.json({ error: "User Not Found" });
      user.walletBalance -= updatedTransaction.amount;
      admin.walletBalance -= updatedTransaction.amount;
      await user.save();
      await admin.save();
    }
    updatedTransaction.status = status;
    updatedTransaction.adminRemarks = adminRemarks;
    await updatedTransaction.save();
    res.status(200).json({ status: "Txn Updated" });
  } catch (error) {
    console.error("Error updating withdrawal transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDepositByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const depositTransactions = await TransactionModel.find({
      transactionType: "Deposit",
      userId: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(depositTransactions);
  } catch (error) {
    console.error("Error fetching deposit transactions by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWithdrawalByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const withdrawalTransactions = await TransactionModel.find({
      transactionType: "Withdraw",
      userId: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(withdrawalTransactions);
  } catch (error) {
    console.error("Error fetching withdrawal transactions by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTransactionsByUserId = async (req, res) => {
  const userId = req.body.userId;
  try {
    const userTransactions = await TransactionModel.find({
      userId,
    }).sort({ createdAt: -1 });
    if (userTransactions.length === 0) {
      return res.status(404).json({ error: "No Transactions Found" });
    }
    res.status(200).json(userTransactions);
  } catch (error) {
    console.error("Error fetching transactions for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDeposit,
  getAllWithdrawal,
  updateDeposit,
  updateWithdraw,
  getDepositByUserId,
  getWithdrawalByUserId,
  getTransactionsByUserId,
};
