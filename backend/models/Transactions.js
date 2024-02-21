const mongoose = require("mongoose");
const validator = require("validator");

const TransactionsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    utrId: { type: String, default: "XXXXR7310682908954385XX" },
    mobileNumber: { type: Number, required: true },
    walletBalance: { type: Number, required: true },
    upiID: { type: String, default: "1234567890@upi" },
    amount: { type: Number, default: 0 },
    status: { type: String, default: "Pending" },
    transactionType: { type: String, required: true },
    adminRemarks: {
      type: String,
      default: "This message will be uploaded by Admin.",
    },
  },
  { timestamps: true }
);

TransactionsSchema.statics.createTxn = async function (
  userId,
  mobileNumber,
  walletBalance,
  amount,
  transactionType
) {
  if (!userId || !mobileNumber || !amount || !transactionType)
    throw Error("All fields required");
  const formattedMobileNumber =
    typeof mobileNumber === "number" ? mobileNumber.toString() : mobileNumber;
  if (!validator.isMobilePhone(formattedMobileNumber))
    throw Error("Invalid Mobile Number");
  if (amount < 0) throw Error("Invalid(negative) amount");
  return await this.create({
    userId,
    mobileNumber: formattedMobileNumber,
    walletBalance,
    amount: amount,
    transactionType: transactionType,
  });
};

module.exports = mongoose.model("transaction", TransactionsSchema);
