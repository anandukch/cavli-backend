const S3 = require("aws-sdk/clients/s3");

class AWSUtils {
  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucket = process.env.AWS_BUCKET_NAME;
  }

  async uploadFile(file) {
    const params = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
    };
    return this.s3.upload(params).promise();
  }

  async deleteFile(file) {
    const params = {
      Bucket: this.bucket,
      Key: file.originalname,
    };
    return this.s3.deleteObject(params).promise();
  }

//   static async uploadFile(file) {
//     const params = {
//       Bucket: bucket,
//       Key: Date.now().toString() + path.extname(file.originalname),
//       Body: file.buffer,
//     };
//     return await this.s3.upload(params).promise();
//   }
//   static async deleteFile(key) {
//     const params = {
//       Bucket: bucket,
//       Key: key,
//     };
//     return await s3.deleteObject(params).promise();
//   }
}

module.exports = AWSUtils;
