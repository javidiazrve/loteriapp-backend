import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from 'src/dtos/newUser.dto';
import { User } from 'src/schemas/user.schema';
import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/dtos/user.dto';;
import { MailService } from 'src/services/mail/mail.service';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly mailService: MailService){}

    async getUsers(){
        const users = await this.userModel.find({});
        return users.map((user) => plainToClass(UserDto, user, {excludeExtraneousValues: true}));
    }

    async getUserById(userId: string){
        return await this.userModel.findById(userId);
    }

    async getUserWhere(query: any){
        return await this.userModel.findOne(query);
    }

    async newUser(newUserDto: NewUserDto){

        return await this.userModel.create(newUserDto);
    }

}
