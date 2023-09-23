import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type TweetDocument = HydratedDocument<Tweet>

@Schema()
export class Actions {
    @Prop({ default: [] })
    likes: mongoose.Schema.Types.ObjectId[];

    @Prop({ default: [] })
    comments: mongoose.Schema.Types.ObjectId[];

    @Prop({ default: [] })
    retweet: mongoose.Schema.Types.ObjectId[];
}

@Schema()
export class Tweet {

    @Prop()
    @IsNotEmpty()
    content: string

    @Prop()
    media?: string

    @Prop()
    @IsNotEmpty()
    sharedBy: string

    @Prop()
    @IsNotEmpty()
    userId: string

    @Prop()
    profilePicture?: string

    @Prop({ default: Date.now()})
    @IsNotEmpty()
    date: Date

    @Prop({ type: Actions, default: () => new Actions() })
    Actions: Actions;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)