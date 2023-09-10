import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/dtos/user.dto';
import { NewUserDto } from 'src/dtos/newUser.dto';
import { EmaiVerifyDto } from 'src/dtos/emaiVerify.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/services/mail/mail.service';
import { generateUniqueId } from 'src/utils';

const moment = require("moment");

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly configService: ConfigService, private jwtService: JwtService, private mailService: MailService){}

    async login(credentials: CredentialsDto){

        const incorrectLoginException = new HttpException("Email or Password incorrect.", HttpStatus.UNAUTHORIZED); 

        const user = await this.usersService.getUserWhere({email: credentials.email});

        if(!user) throw incorrectLoginException;

        const correctPassword = await compare(credentials.password, user.password);

        if(!correctPassword) throw incorrectLoginException;

        const jwt = await this.jwtService.signAsync({id: user.id});

        return {
            jwt,
            user: plainToClass(UserDto,user, {excludeExtraneousValues: true}),
        };
    }

    async createUser(newUserDto: NewUserDto){

        const {username, email, trxWallet, password} = newUserDto;

        const usedUser = await this.usersService.getUserWhere({$or: [{username},{email},{trxWallet}]});

        if(usedUser){
            let property = "";
            if(usedUser.username === username) property = "Username";
            else if(usedUser.email === email) property = "Email"
            else if(usedUser.trxWallet === trxWallet) property = "Tron Wallet"

            throw new HttpException(`${property} already in use`, HttpStatus.CONFLICT);
        }

        newUserDto.password = await hash(password, 10);

        const emailVerificationCode = generateUniqueId();

        const user = {
            ...newUserDto,
            config: {
                email: {
                    emailVerified: false,
                    emailVerificationCode: emailVerificationCode,
                    emailCodeExpiration: moment(new Date()).add(15, 'm').toDate(),
                }
            }
        }
        
        this.mailService.sendEmailVarificationCode(newUserDto.email, emailVerificationCode);
        
        const userDB = await this.usersService.newUser(user);
        
        return plainToClass(UserDto, userDB, {excludeExtraneousValues: true});
    }

    async confirmEmail(emailVerifyDto: EmaiVerifyDto, userId: string){

        const user = await this.usersService.getUserById(userId);

        if(!user) throw new HttpException("Not User Found", HttpStatus.UNAUTHORIZED);

        if(user.config.email.emailVerified) throw new HttpException("Email Already Verified", HttpStatus.CONFLICT);

        if(new Date() > user.config.email.emailCodeExpiration) throw new HttpException("Code Expired", HttpStatus.CONFLICT)

        if(user.config.email.emailVerificationCode !== emailVerifyDto.verificationCode) throw new HttpException("Wrong Code", HttpStatus.CONFLICT);

        await user.updateOne({
            $set: {
                config:{
                    email: {
                        emailVerified: true,
                        emailVerificationCode: "",
                        emailCodeExpiration: null
                    }
                }
            }
        });
        
    }

    async sendEmailVerificationCode(userId: string){
        const user = await this.usersService.getUserById(userId);

        if(!user) throw new HttpException("Not User Found", HttpStatus.UNAUTHORIZED);

        if(user.config.email.emailVerified) throw new HttpException("Email already verified", HttpStatus.CONFLICT);

        const emailVerificationCode = generateUniqueId();

        this.mailService.sendEmailVarificationCode(user.email, emailVerificationCode);

        await user.updateOne({
            $set: {
                "config.email.emailVerificationCode": emailVerificationCode,
                "config.email.emailCodeExpiration": moment(new Date()).add(15, 'm').toDate(),
            }
        });

    }

}
