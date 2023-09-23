import { ObjectId } from "mongoose";


export class LikeDislikeDto {
    tweetId: ObjectId;
    username: string;
}