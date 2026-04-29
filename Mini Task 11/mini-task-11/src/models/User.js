// models/User.js

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,      // email is case insensitive
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,        // By default, select queries will not return password field
                            // To return password too, we will use: User.findOne({}).select("+password")
    },
    role: {
      type: String,
      enum: ["owner", "employee"],     // only these two values allowed
      default: "employee",             // New User == employee, (By default)
    },
  },
)

// ================== Mongoose Middleware (pre-save hook) ==================
// Runs automatically before every .save() call

UserSchema.pre("save", async function () {
  // `this` refers to the document being saved

  // Only hash if password was changed
  if (!this.isModified("password")) 
    return

  this.password = await bcrypt.hash(this.password, 10)      // 10 salt rounds (default)
})

// ============================ Instance Method ============================
// Method for a single user document
// Example: user.comparePassword("abc123") 

UserSchema.methods.comparePassword = async function (passwordEntered) {
  // NOTE: "this.password" will be available if .select("+password") is used
  return await bcrypt.compare(passwordEntered, this.password)
}

export default mongoose.models.User || mongoose.model("User", UserSchema)