const S3Client = require("@aws-sdk/client-s3").S3Client
const PutObjectCommand = require("@aws-sdk/client-s3").PutObjectCommand
const GetObjectCommand = require("@aws-sdk/client-s3").GetObjectCommand

const REGION = "us-east-1";

const createS3Client = () => {
  return new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });
}


const put = async (name, key, body) => {
  try {
    const s3Client = createS3Client();
    const uploadParams = {
      Bucket: name,
      Key: key,
      Body: body
    };
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

const get = async (name, key) => {
  try {
    const s3Client = createS3Client();
    const bucketParams = {
      Bucket: name,
      Key: key,
    };
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    return await data.Body.transformToString();
  } catch (err) {
    console.log("Error", err);
  }
};


module.exports = { put, get }
