import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class EmaiVerifyDto{

    @ApiProperty({
        title: "Email Verification Code",
        description: "Code to complete the email verification.",
    })
    @IsString({message: "Verification Code has to be string."})
    @IsNotEmpty({message: "Verification Code can't be empty."})
    verificationCode: string;

}