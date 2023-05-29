const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./config/passport");
const expenseRoutes = require("./routes/expense");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const PORT = process.env.PORT || 4000;
//allowing to request data from localhost4000
app.use(cors());
//express.json will work the same as express body-parser
app.use(express.json());
app.use(passport.initialize());
passportConfig(passport);

//connecting to the MongoDB
connectDB();

//Response to the server
app.get("/", (req, res) => {
  res.send("Server is running");
});

//routes
app.use("/api/expense", expenseRoutes);
app.use("/api/authentication", authRoutes);
app.use("/api/category", categoryRoutes);
//app listening on port 4000
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
