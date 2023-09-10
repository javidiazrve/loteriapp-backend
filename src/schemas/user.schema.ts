import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  trxWallet: string;

  @Prop()
  birthdate: Date;

  @Prop({default: new Date()})
  creationDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User);