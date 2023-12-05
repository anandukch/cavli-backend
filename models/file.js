const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    // fileType: {
    //   type: String,
    //   required: true,
    // },
    // fileSize: {
    //   type: String,
    //   required: true,
    // },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const FileModel = mongoose.model("file", FileSchema);

module.exports = FileModel;
