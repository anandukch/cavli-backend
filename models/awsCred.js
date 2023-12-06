import mongoose from "mongoose";

const AwsCredSchema = new mongoose.Schema({
  accessKey: {
    type: String,
    required: true,
  },
  secretAccessKey: {
    type: String,
    required: true,
  },
  bucketName: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
});

AwsCredSchema.methods.generateAuthToken = async function () {
  const awsConfig = this;
  const token = jwt.sign(
    { _id: awsConfig._id.toString() },
    process.env.JWT_SECRET || "secret"
  );
  return token;
};

const AwsCredModel = mongoose.model("awsCredentials", AwsCredSchema);

export default AwsCredModel;
