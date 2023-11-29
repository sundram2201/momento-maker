const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const momentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
      },
    ],
    userId: {
      type: ObjectId,
      ref: "user",
    },
    files: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("moment", momentSchema);
