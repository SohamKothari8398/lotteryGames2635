const ComplaintsModel = require("../models/Complaints");
const mongoose = require("mongoose");

// get all complaints
const getAllComplaints = async (req, res) => {
  try {
    // Fetch all user complaints
    const complaints = await ComplaintsModel.find();
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get User Complaints based on User ID
const getUserComplaints = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch complaints data based on the user ID
    const userComplaints = await ComplaintsModel.find({ userId });
    res.json(userComplaints);
  } catch (err) {
    console.error("Error fetching user complaints:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const createUserComplaints = async (req, res) => {
  try {
    const {
      userId,
      mobileNumber,
      complaintID, // Updated field name to complaintID
      compDate,
      compTime,
      gameName,
      compSubject,
      compDescription,
    } = req.body;

    // Check if the complaint already exists
    const existingComplaint = await ComplaintsModel.findOne({
      userId,
      mobileNumber,
      complaintID,
      compSubject,
      compDescription,
    });

    if (existingComplaint) {
      return res
        .status(400)
        .json({ error: "Your Complaint is already registered." });
    }

    // Create a new complaint
    const newComplaint = await ComplaintsModel.create({
      userId,
      mobileNumber,
      complaintID, // Updated field name to complaintID
      compDate,
      compTime,
      gameName,
      compSubject,
      compDescription,
      adminRemarks: "This will be updated by the Admin",
    });

    res.json({ status: "Complaint Filed.", complaint: newComplaint });
  } catch (err) {
    console.error("Error processing complaint:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const updatedComplaintStatus = async (req, res) => {
  try {
    const { adminRemarks, compStatus } = req.body;
    const { complaintID } = req.params;
    // Find the complaint by _id and update adminRemarks and compStatus
    const updatedComplaint = await ComplaintsModel.findByIdAndUpdate(
      complaintID,
      { adminRemarks, compStatus },
      { new: true } // This ensures that the updated document is returned
    );
    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({
      status: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports = {
  getAllComplaints,
  getUserComplaints,
  createUserComplaints,
  updatedComplaintStatus,
};
