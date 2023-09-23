import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { TweetController } from './tweet.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30d" } // jwt register
    })
  ],
  controllers: [TweetController],
  providers: [TweetService]
})
export class TweetModule {}
