import { Exclude, Expose, Type } from "class-transformer";

export class EmailConfig{
    @Expose()
    emailVerified: boolean

    @Exclude()
    emailVerificationCode: string

    @Exclude()
    emailCodeExpiration: Date
}

export class UserConfig{

    @Expose()
    @Type(() => EmailConfig)
    email: EmailConfig

}

export class UserDto{

    @Expose()
    name: string;
    @Expose()
    lastname: string;
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    trxWallet: string;
    @Expose()
    birthdate: Date;

    @Expose()
    @Type(() => UserConfig)
    config: UserConfig;
}

