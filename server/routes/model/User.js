const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

const UserSchema = Schema(
  {
    firstName: { type: String, required: ["First Name field is required"] },
    lastName: { type: String, required: ["Last Name field is required"] },
    email: {
      type: String,
      required: ["Email field is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: ["Password field is required"],
      minlength: 8,
    },
    categories: [{ label: String, icon: String }],
  },

  { versionKey: false },
  { timestamp: true }
);
// //
// UserSchema.statics.findAndValidate = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (!user) {
//     return false;
//   }
//   const isValid = await bcrypt.compare(password, user.password);
//   return isValid ? user : false;
// };
// //
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
// export default new mongoose.model("User", UserSchema);
