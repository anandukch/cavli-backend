import S3 from "aws-sdk/clients/s3.js";
import { extname } from "path";

class AWSUtils {
  async loadConfig(awsConfig) {
    this.s3 = new S3({
      accessKeyId: awsConfig.accessKey,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region || "ap-south-1",
      apiVersion: "2006-03-01",
    });
    this.bucket = awsConfig.bucketName;
  }

  async uploadFile(file) {
    console.log("bucket", this.bucket);
    const params = {
      Bucket: this.bucket,
      Key: Date.now().toString() + extname(file.originalname),
      Body: file.buffer,
    };
    return await this.s3.upload(params).promise();
  }
  async getObject(key) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };
    return await this.s3.getObject(params).promise();
  }
}

export default AWSUtils;
