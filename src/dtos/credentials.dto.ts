import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CredentialsDto {

    @ApiProperty({
        example: "email@email.com"
    })
    @IsDefined({message: "Email is required"})
    @IsEmail({},{message: "Email is invalid"})
    email: string;

    @ApiProperty({
        example: "123456Ap*"
    })
    @IsDefined({message: "Password is required"})
    @IsString({message: "Password has to be string"})
    @IsNotEmpty({message: "Password can't be empty"})
    password: string;
}