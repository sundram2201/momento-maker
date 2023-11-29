const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required"],
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
    },
    mobile_no_pre: {
      type: String,
      required: [true, "mobile_no_pre is required"],
      trim: true,
      lowercase: true,
    },
    mobile_no: {
      type: Number,
      required: [true, "mobile_no is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "city is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
