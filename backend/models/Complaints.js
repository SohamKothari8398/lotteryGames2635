const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintsSchema = new Schema(
  {
    userId: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    complaintID: { type: String, required: true },
    compDate: { type: String, required: true },
    compTime: { type: String, required: true },
    gameName: { type: String, required: true },
    compSubject: { type: String, required: true },
    compDescription: { type: String, required: true },
    adminRemarks: { type: String, required: true },
    compStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaints", ComplaintsSchema);
