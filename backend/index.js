// All Important Imports
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://www.up365gaming.com",
      "https://up365gaming.com",
      "https://api.up365gaming.com",
    ],
    // Same origin allowed for Socket.IO // origin: "https://up365gaming.com" || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // Allowed methods for Socket.IO
    allowedHeaders: "*",
    credentials: true,
    // Allow cookies for Socket.IO
  },
});

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://www.up365gaming.com",
//       "https://up365gaming.com",
//       "https://api.up365gaming.com",
//     ],
// Same origin allowed for Socket.IO // origin: "https://up365gaming.com" || "http://localhost:3000",
// methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// Allowed methods for Socket.IO
// credentials: true,
// Allow cookies for Socket.IO
//   },
// });

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/", UserRouter);
app.use("/", PromosLinksRouter);
app.use("/", TransactionsRouter);
app.use("/admin", AdminRoutes);
app.use("/user/complaints", ComplaintsRouter);
app.use("/games/singleDigitLottery", SingleLotteryGameRouter);
app.use("/games/doubleDigitLottery", DoubleLotteryGameRouter);
app.use("/games/tripleDigitLottery", TripleLotteryGameRouter);
app.use("/games/colorBallLottery", ColorballGameRouter);

mongoose
  .connect(process.env.MONGO || "mongodb://localhost:27017/up365gaming")
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT || 4000, () => {
      console.log(
        `Backend Server is running on port ${process.env.PORT || 4000}`
      );
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
