import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetModule } from './tweet/tweet.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  AuthModule, 
  MongooseModule.forRoot(process.env.MONGODB_URL),
  TweetModule,
  AwsModule,
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}