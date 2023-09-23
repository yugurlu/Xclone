import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from './schemas/tweet.schema';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { TweetDto } from './dto/tweet.dto';
import { JwtService } from '@nestjs/jwt';
import { LikeDislikeDto } from './dto/like-dislike.dto';

@Injectable()
export class TweetService {
    constructor(
        @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async   createTweet(dto: TweetDto, req: any){
        const currentUser = await this.userModel.findOne({ username: dto.username })

        if (currentUser.EmailVerification.isVerified) {
            const newTweet = new this.tweetModel({
                content: dto.content,
                media: dto.media,
                sharedBy: currentUser.username,
                userId: currentUser.id,
                profilePicture: currentUser.profilePicture,
                date: Date.now(),
            })
            await currentUser.updateOne({$push: { "Tweets": newTweet._id }})
            return newTweet.save();
        }
        else
            throw new UnauthorizedException("User mail not verified!") 
    }

    async   editTweet(dto: TweetDto, id: string, req: any) {
        const tweet = await this.tweetModel.findById(id)
        if (req.user.username != tweet.sharedBy)
            throw new UnauthorizedException("This is not your Tweet!")

        return await this.tweetModel.findByIdAndUpdate(id, dto, { new: true })
    }

    async   removeTweet(id: string, req: any) {
        const tweet = await this.tweetModel.findById(id)
        if (req.user.username != tweet.sharedBy)
            throw new UnauthorizedException("This is not your Tweet!")

        return await this.tweetModel.findByIdAndRemove(id, { new: true })
    }

    async   likeDislike(dto: LikeDislikeDto) {
        const tweet = await this.tweetModel.findById(dto.tweetId)
        const currentUser = await this.userModel.findOne({ username: dto.username })

        if (!tweet.Actions.likes.includes(currentUser.id)) {
            await tweet.updateOne({ $push: { 'Actions.likes' : currentUser._id } })
            await currentUser.updateOne({ $push: { 'UserTweetActions.userLikes' : tweet._id } })
            return { status: 'Success', msg: 'Tweet Liked' }
        }
        else {
            await tweet.updateOne({ $pull: { 'Actions.likes': currentUser._id } })
            await currentUser.updateOne({ $pull: { 'UserTweetActions.userLikes' : tweet._id } })
            return { status: 'Success', msg: 'Tweet Disliked' };
        }
    }

    async   getAllTweets() {
        const tweets = (await this.tweetModel.find()).reverse()
        return tweets
    }

    async getUserTweet(req: any) {
        const currentUser = await this.userModel.findOne({ email: req.currentUser.email })
        return await this.tweetModel.find({ email: currentUser._id })
    }

    async getOneTweet(id: string) {
        return await this.tweetModel.findById(id)
    }

}
