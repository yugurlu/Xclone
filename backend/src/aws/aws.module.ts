import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  controllers: [AwsService],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}