import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { NewUserDto } from 'src/dtos/newUser.dto';
import { UsersService } from 'src/users/users.service';
import { EmaiVerifyDto } from 'src/dtos/emaiVerify.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private usersService: UsersService){}

    @Post('/login')
    @ApiOperation({
        summary: "Login",
        description: "Login functionality."
    })
    async login(@Body() credentials: CredentialsDto){

        return await this.authService.login(credentials);

    }

    @Post('/signup')
    @ApiOperation({ 
        summary: "Create New Users",
        description: "Create a new user.",
    })
    async signup(@Body() newUserDto: NewUserDto){
        return await this.authService.createUser(newUserDto);
    }

    @ApiBearerAuth()
    @Post('/email/verification')
    @UseGuards(AuthGuard)
    @ApiOperation({ 
        summary: "Verify Email",
        description: "Email Verification",
    })
    async confirmEmail(@Body() emaiVerifyDto: EmaiVerifyDto, @Req() req){

        const {userId} = req;

        return await this.authService.confirmEmail(emaiVerifyDto, userId);
    
    }

    @ApiBearerAuth()
    @Put('/email/sendVerificationCode')
    @UseGuards(AuthGuard)
    @ApiOperation({ 
        summary: "Verify Email",
        description: "Email Verification",
    })
    async sendEmailVerificationCode(@Req() req){

        const {userId} = req;

        return await this.authService.sendEmailVerificationCode(userId);
    
    }

}
