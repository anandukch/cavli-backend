const FileModel = require("../models/file");
const AWSUtils = require("../utils/s3");

// const awsUtils = new AWSUtils();

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const result = await AWSUtils.uploadFile(file);
    // const result = await AWSUtils.uploadFile(file);
    // console.log(await AWSUtils.listObjects());
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
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
    // const result = await FileModel.findById(req.params.id);
    const fileObj = await AWSUtils.getObject(req.params.id);
    const result = JSON.parse(new Buffer.from(fileObj.Body).toString("utf8"));
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  uploadFile,
  listAllFiles,
  getFile,
};
