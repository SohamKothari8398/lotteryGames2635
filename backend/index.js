// All Important Imports
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["https://up365gaming.com"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://up365gaming.com",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// Importing Routers
const UserRouter = require("./routes/userRouter");
const PromosLinksRouter = require("./routes/promosLinksRouter");
const TransactionsRouter = require("./routes/transactionsRouter");
const ComplaintsRouter = require("./routes/complaintsRouter");
const AdminRoutes = require("./routes/adminRouter");
const SingleLotteryGameRouter = require("./routes/singleLotteryGameRouter");
const DoubleLotteryGameRouter = require("./routes/doubleLotteryGameRouter");
const TripleLotteryGameRouter = require("./routes/tripleDigitLotteryRouter");
const ColorballGameRouter = require("./routes/colorBallRouter");

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use("/", UserRouter);
app.use("/", PromosLinksRouter);
app.use("/", TransactionsRouter);
app.use("/admin", AdminRoutes);
app.use("/user/complaints", ComplaintsRouter);

app.use("/games/singleDigitLottery", SingleLotteryGameRouter);
app.use("/games/doubleDigitLottery", DoubleLotteryGameRouter);
app.use("/games/tripleDigitLottery", TripleLotteryGameRouter);
app.use("/games/colorBallLottery", ColorballGameRouter);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Backend Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       const allowedOrigins = ["http://localhost:3000"];
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       const errorMessage = "Access Denied";
//       return callback(new Error(errorMessage), false);
//     },
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );
