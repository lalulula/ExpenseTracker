const mongoose = require("mongoose");
const db = `mongodb+srv://yunahkim:andrea2000@expensemern.uet3acf.mongodb.net/`;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
