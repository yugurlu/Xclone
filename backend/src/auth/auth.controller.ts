import { Body, Controller, Get, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { Response } from 'express';
import { CookieAuthGuard } from './cookie-auth.guard';


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto)
    }

    @Post("login")
    login(@Body() authDto: AuthDto, @Res() res: Response) {
        return this.authService.login(authDto, res)
    }

    @Patch("verify")
    verify(@Body() verifyDto: VerifyDto) {
        return this.authService.verify(verifyDto)
    }

    @Post("sendtoken")
    sendToken(@Body() askVerifyDto: AskVerifyDto) {
        return this.authService.sendToken(askVerifyDto)
    }

    @Put("change-password/:id")
    changePassword(@Param("id") id: string, @Req() req: any, @Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(id, req, changePasswordDto)
    }

    @UseGuards(CookieAuthGuard)
    @Get("user/:id")
    getUser(@Param("id") id: string) {
        return this.authService.getUser(id)
    }

    @Get("user/image/:id")
    getUserProfileImage(@Param("id") id: string) {}
}
