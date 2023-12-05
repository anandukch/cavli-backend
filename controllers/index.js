import FileModel from "../models/file.js";
import AWSUtils from "../utils/s3.js";

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const result = await AWSUtils.uploadFile(file);
    const fileObj = new FileModel({
      name: file.originalname,
      key: result.Key,
      url: result.Location,
    });
    await fileObj.save();
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

export { uploadFile, listAllFiles, getFile };
