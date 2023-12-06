import FileModel from "../models/file.js";
import AwsCredModel from "../models/awsCred.js";
import AWSUtils from "../utils/s3.js";

const uploadFile = async (req, res) => {
  try {

    // const user = req.user;
    // if(user){
    //   const awsConfig = await AwsCredModel.findById(user._id);
    //   if(!awsConfig){
    //     return res.status(400).json({ error: "Please provide AWS config" });
    //   }
    //   AWSUtils.setCredentials(awsConfig);
    // }
    const file = req.file;
    const result = await AWSUtils.uploadFile(file);
    const fileObj = new FileModel({
      fileName: result.Key,
      // key: result.Key,
      url: result.Location,
    });
    await fileObj.save();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const listAllFiles = async (req, res) => {
  try {
    const result = await FileModel.find();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getFile = async (req, res) => {
  try {
    const fileObj = await AWSUtils.getObject(req.params.id);
    const result = JSON.parse(new Buffer.from(fileObj.Body).toString("utf8"));
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const addAwsConfig = async (req, res) => {
  try {
    const awsConfig = req.body;
    if (
      !awsConfig.accessKey ||
      !awsConfig.secretAccessKey ||
      !awsConfig.bucketName
    ) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    const awsConfigObj = new AwsCredModel.findOne({
      accessKey: awsConfig.accessKey,
      secretAccessKey: awsConfig.secretAccessKey,
      bucketName: awsConfig.bucketName,
    });

    if (awsConfigObj) {
      const token = await awsConfigObj.generateAuthToken();
      return res.status(200).json({ token });
    }

    const newAwsConfigObj = new AwsCredModel(awsConfig);
    await newAwsConfigObj.save();
    const token = await newAwsConfigObj.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { uploadFile, listAllFiles, getFile, addAwsConfig };
