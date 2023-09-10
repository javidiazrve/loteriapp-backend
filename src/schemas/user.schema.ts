import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export class EmailConfig{
  emailVerified: Boolean = false;
  emailVerificationCode: String;
  emailCodeExpiration: Date;
}

export class UserConfig {
  email: EmailConfig;
}

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

  @Prop({type: UserConfig})
  config: UserConfig;

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