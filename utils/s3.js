import S3 from "aws-sdk/clients/s3.js";
import { extname } from "path";
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1"
});
const bucket = "cavli-test";
class AWSUtils {
  // static setCredentials(awsConfig) {
  //   s3.config.update({
  //     accessKeyId: awsConfig.accessKey,
  //     secretAccessKey: awsConfig.secretAccessKey,
  //     region: awsConfig.region || "ap-south-1",
  //   });
  //   bucket = awsConfig.bucketName;
  // }
  static async uploadFile(file) {
    console.log(process.env.AWS_ACCESS_KEY,process.env.AWS_SECRET_ACCESS_KEY);
    const params = {
      Bucket: bucket,
      Key: Date.now().toString() + extname(file.originalname),
      Body: file.buffer,
    };
    return await s3.upload(params).promise();
  }

  static async deleteFile(key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return await s3.deleteObject(params).promise();
  }

  static async deleteBucket() {
    const params = {
      Bucket: bucket,
    };
    return await s3.deleteBucket(params).promise();
  }

  static async listObjects() {
    const params = {
      Bucket: bucket,
    };
    return await s3.listObjects(params).promise();
  }

  static async getObject(key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return await s3.getObject(params).promise();
  }
}


export default AWSUtils;
