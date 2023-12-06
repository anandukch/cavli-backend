import { Schema, model } from "mongoose";

const FileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    refId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FileModel = model("file", FileSchema);

export default FileModel;
