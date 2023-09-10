import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { IsTrc20Wallet } from "src/decorators/trc20wallet.decorator";

export class NewUserDto {

    @ApiProperty({
        type: String,
        description: "The user name",
        example: "Pedro",
        required: true,
    })
    @IsDefined({message: "Name is required"})
    @IsString({message: "Name has to be string"})
    @IsNotEmpty({message: "Name can't be empty"})
    @MinLength(3, {message: "Name is too short"})
    name: string;
    
    @ApiProperty({
        type: String,
        description: "The user lastname",
        required: true,
        example: "Perez"
    })
    @IsDefined({message: "Last name is required"})
    @IsString({message: "Last name has to be string"})
    @IsNotEmpty({message: "Last name can't be empty"})
    @MinLength(3, {message: "Last name is too short"})
    lastname: string;

    @ApiProperty({
        type: String,
        description: "The user username",
        required: true,
        example: "Perez"
    })
    @IsDefined({message: "Username is required"})
    @IsString({message: "Username has to be string"})
    @IsNotEmpty({message: "Username can't be empty"})
    @MinLength(3, {message: "Username is too short"})
    username: string;

    @ApiProperty({
        type: String,
        description: "The user email",
        required: true,
        example: "pedroperez@gmail.com"
    })
    @IsDefined({message: "Email is required"})
    @IsEmail({},{message: "Email is not valid"})
    email: string;

    @ApiProperty({
        type: String,
        description: "The user password",
        required: true,
        example: "1234Hola*"
    })
    @IsDefined({message: "Password is required"})
    @IsString({message: "Password has to be string"})
    @IsStrongPassword(
        {
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1,
        }, 
        {message: "Password is not strong, password has to contain lowercase, uppercase, symbol, numbers and minimum length is 8."}
    )
    password: string;

    @ApiProperty({
        type: String,
        description: "The user TRC20 Wallet(TRON)",
        required: true,
        example: "THAtuHjeNNbtVrQUniVNnAHXu6YRMAftZT"
    })
    @IsDefined({message: "TrxWallet is required"})
    @IsString({message: "TrxWallet has to be string"})
    @IsNotEmpty({message: "TrxWallet can't be empty"})
    @IsTrc20Wallet({message: "TrxWallet invalid address"})
    trxWallet: string;

    @ApiProperty({
        type: Date,
        description: "The user birthdate in format (YYYY-mm-dd)",
        required: true,
        example: "1999-01-04"
    })
    @IsDefined({message: "Birthdate is required"})
    @IsDateString({},{message: "Birthdate has to be in format YYYY-mm-dd"})
    birthdate: Date;

}