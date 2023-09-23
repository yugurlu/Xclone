import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { EmailVerificationService } from './email-verification/email-verification.service';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30d" } // jwt register
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailVerificationService]
})
export class AuthModule {}
