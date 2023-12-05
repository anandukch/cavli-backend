const S3 = require("aws-sdk/clients/s3");
const path = require("path");
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});
const bucket = "cavli-test";
class AWSUtils {
  static async uploadFile(file) {
    const params = {
      Bucket: bucket,
      Key: Date.now().toString() + path.extname(file.originalname),
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

// const {
//   S3Client,
//   PutObjectCommand,
//   CreateBucketCommand,
//   DeleteObjectCommand,
//   DeleteBucketCommand,
//   paginateListObjectsV2,
//   GetObjectCommand,
// } = require("@aws-sdk/client-s3");
// const path = require("path");
// const s3Client = new S3Client({
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const bucket = process.env.AWS_BUCKET_NAME | 'cavli';

// class AWSUtils {
//   static async uploadFile(file) {
//     const params = {
//       Bucket: bucket,
//       Key: Date.now().toString() + path.extname(file.originalname),
//       Body: file.buffer,
//     };
//     return await s3Client.send(new PutObjectCommand(params));
//   }
//   static async deleteFile(key) {
//     const params = {
//       Bucket: bucket,
//       Key: key,
//     };
//     return await s3Client.send(new DeleteObjectCommand(params));
//   }
//   static async deleteBucket() {
//     const params = {
//       Bucket: bucket,
//     };
//     return await s3Client.send(new DeleteBucketCommand(params));
//   }
//   static async createBucket() {
//     const params = {
//       Bucket: bucket,
//     };
//     return await s3Client.send(new CreateBucketCommand(params));
//   }
//   static async listObjects() {
//     const params = {
//       Bucket: bucket,
//     };
//     return paginateListObjectsV2({ client: s3Client }, params);
//   }
//   static async getObject(key) {
//     const params = {
//       Bucket: bucket,
//       Key: key,
//     };
//     return await s3Client.send(new GetObjectCommand(params));
//   }
// }

module.exports = AWSUtils;
