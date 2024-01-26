const express = require("express");
const {
  updatedComplaintStatus,
} = require("../controllers/complaintController");
const {
  getAllDeposit,
  getAllWithdrawal,
  updateDeposit,
  updateWithdraw,
  getTransactionsByUserId,
} = require("../controllers/transactionsController");

const router = express.Router();

router.get("/user/wallet", getTransactionsByUserId);
router.get("/admin/adminDepositApprovalsPage", getAllDeposit);
router.get("/admin/adminWithdrawalApprovalsPage", getAllWithdrawal);
router.patch("/admin/adminDepositApprovalsPage/:transactionID", updateDeposit);
router.patch(
  "/admin/adminWithdrawalApprovalsPage/:transactionID",
  updateWithdraw
);
router.patch("/admin/usersComplaints/:complaintID", updatedComplaintStatus);

module.exports = router;
