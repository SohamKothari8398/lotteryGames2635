const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    password: { type: String, required: true },
    // passwordTrials: { type: Number, required: true },
    // loginLock: { type: String, required: true },
    promoCode: { type: String, default: "UP365dis10" },
    // giftCard: { type: String, default: "UP365GC100" },
    otp: { type: Number, default: 12345678 },
    discount: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    upiID: { type: String, default: "1234567890@upi" },
    walletBalance: { type: Number, default: 0 },
    role: { type: String, default: "user" },
    games: { type: String, default: "active" },
    bets: { type: String, default: "active" },
    accountStatus: { type: String, default: "active" },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesActive: { type: Number, default: 0 },
    gamesLoss: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Static Register
UserSchema.statics.register = async function (
  userID,
  mobileNumber,
  password,
  promoCode
) {
  if (!mobileNumber || !password || !promoCode || !userID)
    throw new Error("All fields required");
  if (!validator.isAlphanumeric(userID))
    throw new Error(
      "Invalid User-ID. User-ID is a combination of a-z,A-Z and 0-9"
    );
  if (!validator.isMobilePhone(mobileNumber))
    throw new Error("Invalid Mobile Number");
  if (!validator.isStrongPassword(password))
    throw new Error(
      "Use Strong Password with 1 UC, 1 LC, 1 Number and 1 Special Character."
    );
  const exists = await this.findOne({ userID });
  if (exists) {
    throw new Error("MobileNumber already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({ userID, mobileNumber, password: hash, promoCode });
};

// Static Login
UserSchema.statics.login = async function (userID, password) {
  const user = await this.findOne({ userID });
  if (!user) throw new Error("User not found");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Password Mismatch");
  return user;
};

// Static Change Password
UserSchema.statics.changePassword = async function (userID, otp, newPassword) {
  if (!userID || !otp || !newPassword) throw new Error("All fields required");
  const user = await this.findOne({ mobileNumber }); // Find the user by mobileNumber
  if (!user) throw new Error("User not found"); // Check if user exists
  if (user.otp !== otp) throw new Error("Invalid OTP"); // Check if the provided OTP matches the stored OTP
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt); // Generate a new hash for the new password
  user.password = hash; // Update the user's password with the new hash
  await user.save(); // Save the updated user to the database
  return user;
};

// Static Register
UserSchema.statics.createAgent = async function (
  userID,
  mobileNumber,
  password,
  promoCode,
  upiID,
  commission,
  share
) {
  if (
    !mobileNumber ||
    !password ||
    !promoCode ||
    !userID ||
    !upiID ||
    !commission ||
    !share
  )
    throw new Error("All fields required");
  if (!validator.isAlphanumeric(userID))
    throw new Error(
      "Invalid User-ID. User-ID is a combination of a-z,A-Z and 0-9"
    );
  if (!validator.isMobilePhone(mobileNumber))
    throw new Error("Invalid Mobile Number");
  if (!validator.isStrongPassword(password))
    throw new Error(
      "Use Strong Password with 1 UC, 1 LC, 1 Number and 1 Special Character."
    );
  const exists = await this.findOne({ userID });
  if (exists) {
    throw new Error("MobileNumber already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({
    userID,
    mobileNumber,
    password: hash,
    promoCode,
    upiID,
    commission,
    share,
    role: "agent",
  });
};

module.exports = mongoose.model("users", UserSchema);
