import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config()

@Controller("file")
export class AwsService {
  AWS_S3_BUCKET = process.env.S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  });

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file?: Express.Multer.File) {
    const { originalname } = file;
    
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(originalname),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.S3_REGION,
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise()
      return s3Response;
    } catch (error) {
      console.log(error);
    }
  }
}