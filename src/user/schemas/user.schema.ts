import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  age: number;

  @Prop()
  job: string;
  
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
