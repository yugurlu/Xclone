
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dto/tweet.dto';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { LikeDislikeDto } from './dto/like-dislike.dto';

@Controller('tweets')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    @UseGuards(CookieAuthGuard)
    @Post()
    createTweet(@Body() dto: TweetDto, @Request() req: any) {
        return this.tweetService.createTweet(dto, req)
    }

    @Put(":id")
    editTweet(@Body() dto: TweetDto, @Param("id") id: string, @Request() req: any) {
        return this.tweetService.editTweet(dto, id, req)
    }

    @Delete(":id")
    removeTweet(@Param("id") id: string, @Request() req: any) {
        return this.tweetService.removeTweet(id, req)
    }

    @Patch("like-dislike/:id")
    likeDislike(@Body() dto: LikeDislikeDto) {
        return this.tweetService.likeDislike(dto)
    }

    @UseGuards(CookieAuthGuard)
    @Get()
    getAllTweets() {
        return this.tweetService.getAllTweets()
    }

    @Get("user/:id")
    gettUserTweets(@Param("id") id: string) {
        return this.tweetService.getUserTweet(id)
    }

    @Get(":id")
    getOneTweet(@Param("id") id: string) {
        return this.getOneTweet(id)
    }
}
