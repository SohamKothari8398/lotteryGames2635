// All Important Imports
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
// const cors = require("cors");
=======
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests only from your frontend (port 3000)
  credentials: true, // Include cookies in requests
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Same origin allowed for Socket.IO
    methods: ["GET", "POST", "PUT", "PATCH"], // Allowed methods for Socket.IO
    credentials: true, // Allow cookies for Socket.IO
  },
});
>>>>>>> local3000

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
<<<<<<< HEAD
const app = express();
const server = http.createServer(app);

const io = new Server(server);
=======
const CreateUpdateGamesController = require("./controllers/createUpdateGamesController");
>>>>>>> local3000

app.use(express.json());
app.use(cookieParser());

<<<<<<< HEAD
// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
=======
app.use("/", UserRouter);
app.use("/", PromosLinksRouter);
app.use("/", TransactionsRouter);
app.use("/admin", AdminRoutes);
app.use("/user/complaints", ComplaintsRouter);

app.use("/games/singleDigitLottery", SingleLotteryGameRouter);
app.use("/games/doubleDigitLottery", DoubleLotteryGameRouter);
app.use("/games/tripleDigitLottery", TripleLotteryGameRouter);
app.use("/games/colorBallLottery", ColorballGameRouter);

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
>>>>>>> local3000

// Routing
app.use("/", UserRouter);
app.use("/", PromosLinksRouter);
app.use("/", TransactionsRouter);
app.use("/admin", AdminRoutes);
app.use("/user/complaints", ComplaintsRouter);
app.use("/games/singleDigitLottery", SingleLotteryGameRouter);
app.use("/games/doubleDigitLottery", DoubleLotteryGameRouter);
app.use("/games/tripleDigitLottery", TripleLotteryGameRouter);
app.use("/games/colorBallLottery", ColorballGameRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO || "mongodb://localhost:27017/up365gaming")
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Backend Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://www.up365gaming.com",
//       "https://up365gaming.com",
//       "https://api.up365gaming.com",
//     ],
// origin: [
//   "https://www.up365gaming.com",
//   "https://up365gaming.com",
//   "http://www.up365gaming.com",
//   "http://up365gaming.com",
//   "https://api.up365gaming.com",
// ],
// Same origin allowed for Socket.IO // origin: "https://up365gaming.com" || "http://localhost:3000",
// methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// Allowed methods for Socket.IO
// credentials: true,
// Allow cookies for Socket.IO
//   },
// });
