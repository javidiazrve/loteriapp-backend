import { Exclude, Expose } from "class-transformer";


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
    creationDate: Date;
    
}