import { Model } from 'mongoose'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationService } from './email-verification/email-verification.service';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { Response } from 'express';
import ms from 'ms';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly emailVerificationService: EmailVerificationService,
    ) {}

    async register(authDto: AuthDto) {
        const userSearch = await this.userModel.findOne({ email: authDto.email })
        if (!userSearch) {
            const hashedPass = await bcrypt.hash(authDto.password, 10)
            const newUser = new this.userModel({
                username: authDto.username,
                email: authDto.email,
                password: hashedPass,
                profilePicture:`https://twitter-clone-aws.s3.eu-north-1.amazonaws.com/${authDto.profilePicture}`
            })
            const user = await newUser.save()
            return this.createToken(user.email)
        }
        else
            throw new UnauthorizedException("User Already Registered")
    }

    async login(authDto: AuthDto, res: Response) {
        const user =  await this.userModel.findOne({ email: authDto.email })
        if (!user)
            throw new UnauthorizedException("Wrong Email")
        const isMatch = await bcrypt.compare(authDto.password, user.password)
        if (!isMatch)
            throw new UnauthorizedException("Wrong Password")
        
        //SESSION
        const payload = { email: user.email };
        const token = this.jwtService.sign(payload)
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: ms("30d"),
        })
        res.end()
        return user
    }

    async createToken(email: string) {
        return this.jwtService.sign({ email })
    }

    async verify(verifyDto: VerifyDto) {
        const user = await this.userModel.findOne({ email: verifyDto.email })
        const now = new Date
        if (!user)
            throw new UnauthorizedException("User not found")
        if (user.EmailVerification.isVerified)
            throw new UnauthorizedException("User already verified")
        if (user.EmailVerification.token != verifyDto.token)
            throw new UnauthorizedException("Invaild token")
        if (user.EmailVerification.verifiyCodeExpiresAt < now)
          throw new UnauthorizedException("Token is expired")
        else
            return await this.userModel.findByIdAndUpdate(user.id, { 'EmailVerification.isVerified': true }, { new: true })
    }

    async sendToken(askVerifyDto: AskVerifyDto) {
        const user = await this.userModel.findOne({ email: askVerifyDto.email })
        if (!user)
            throw new UnauthorizedException("User not found")
        if (user.EmailVerification.isVerified)
            throw new UnauthorizedException("User already verified")
        else {
            user.EmailVerification.verifiyCodeExpiresAt = new Date
            user.EmailVerification.verifiyCodeExpiresAt.setMinutes(user.EmailVerification.verifiyCodeExpiresAt.getMinutes() + 10)
            user.EmailVerification.token = this.emailVerificationService.generateVerificationToken()

            await this.userModel.findByIdAndUpdate(user.id, user)
            return await this.emailVerificationService.sendVerificationEmail(askVerifyDto.email, user.EmailVerification.token)
        }
    }

    async changePassword(id: string, req: any, changePasswordDto: ChangePasswordDto):Promise<User> {
        const user = await this.userModel.findById(id)
        if (!user)
            throw new UnauthorizedException("User not found")
        if (user.email != req.user.email)
            throw new UnauthorizedException("This acount is not yours")
        var isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password)
        if (!isMatch)
            throw new UnauthorizedException("Old password wrong")       
        isMatch = await bcrypt.compare(changePasswordDto.newPassword, user.password)
        if (isMatch)
            throw new UnauthorizedException("Your new password cannot be the same as the old one")
        
        return await this.userModel.findByIdAndUpdate(id, { "password": await bcrypt.hash(changePasswordDto.newPassword, 10) }, { new: true })
    }

    async getUser(id: string) {
        const user = await this.userModel.findOne({ email: id })
        return user
    }
}



