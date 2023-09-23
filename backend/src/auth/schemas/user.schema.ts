import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class EmailVerification {
    @Prop({ default: false }) 
    isVerified: boolean

    @Prop({ default: "" })
    token: string

    @Prop({ default: Date.now()})
    verifiyCodeExpiresAt: Date
}

@Schema()
export  class UserTweetActions {
    @Prop({ default: [] })
    userLikes: mongoose.Schema.Types.ObjectId[]

    @Prop({ default: [] })
    userComments: mongoose.Schema.Types.ObjectId[]

    @Prop({ default: [] })
    userRetweet: mongoose.Schema.Types.ObjectId[]
}

@Schema()
export class User {
    @Prop()
    @IsNotEmpty()
    @IsString()
    username: string
    
    @Prop()
    @IsNotEmpty()
    @IsString()
    email: string
    
    @Prop()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @Prop()
    profilePicture?: string

    @Prop({ default: [] })
    Tweets: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: UserTweetActions, default: () => new UserTweetActions() })
    UserTweetActions: UserTweetActions;

    @Prop({ type: EmailVerification, default: () => new EmailVerification() })
    EmailVerification: EmailVerification;
}



export const UserSchema = SchemaFactory.createForClass(User)