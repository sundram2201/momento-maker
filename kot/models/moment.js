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
    tags: {
      type: Array,
      default: [],
    },
    userId: {
      type: ObjectId,
      ref: "user",
    },
    file: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("moment", momentSchema);
