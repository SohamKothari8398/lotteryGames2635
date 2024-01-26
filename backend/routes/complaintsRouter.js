const express = require("express");
const Complaints = require("../models/Complaints");
const {
  getAllComplaints,
  getUserComplaints,
  createUserComplaints,
} = require("../controllers/complaintController");

const router = express.Router();

router.get("/", getAllComplaints);

router.get("/:userId", getUserComplaints);

router.post("/", createUserComplaints);

module.exports = router;
