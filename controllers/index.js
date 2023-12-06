import FileModel from "../models/file.js";
import AwsCredModel from "../models/awsCred.js";
import AWSUtils from "../utils/s3.js";
// import { getTokenData } from "../utils/token.js";

let awsUtils = new AWSUtils();
const uploadFile = async (req, res) => {
  try {
    // const tokenObj = getTokenData(req);
    // let refId = null;

    // if (tokenObj) {
    //   refId = tokenObj._id;
    //   const awsConfig = await AwsCredModel.findById(refId);
    //   awsUtils.loadConfig(awsConfig);
    // }
    const refId = req.user;
    const awsConfig = await AwsCredModel.findById(refId);
    awsUtils.loadConfig(awsConfig);
    const file = req.file;
    const result = await awsUtils.uploadFile(file);
    const fileObj = new FileModel({
      fileName: result.Key,
      url: result.Location,
      refId: refId,
    });
    await fileObj.save();
    res.status(200).json({
      status: "success",
      data: {
        fileName: fileObj.fileName,
        url: fileObj.url,
        createdAt: fileObj.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const listAllFiles = async (req, res) => {
  try {
    const refId = req.user;

    const result = await FileModel.find({
      refId: refId,
    });

    res.status(200).json({
      status: "success",
      data: result.map((file) => {
        return {
          fileName: file.fileName,
          url: file.url,
          createdAt: file.createdAt,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getFile = async (req, res) => {
  try {
    let refId = req.user;

    const awsConfig = await AwsCredModel.findById(refId);
    awsUtils.loadConfig(awsConfig);

    const fileObj = await awsUtils.getObject(req.params.fileName);
    const result = JSON.parse(new Buffer.from(fileObj.Body).toString("utf8"));
    return res.status(200).json({
      status: "success",
      data: result,
    });
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

    const awsConfigObj = await AwsCredModel.findOne({
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
    console.log(error);
    res.status(400).json({ error });
  }
};

export { uploadFile, listAllFiles, getFile, addAwsConfig };
