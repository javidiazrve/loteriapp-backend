import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from 'src/dtos/newUser.dto';
import { User } from 'src/schemas/user.schema';
import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async getUsers(){
        const users = await this.userModel.find({});
        return users.map((user) => plainToClass(UserDto, user, {excludeExtraneousValues: true}));  
    }

    async createUser(newUserDto: NewUserDto){

        const {username, email, trxWallet, password} = newUserDto;

        const usedUser = await this.userModel.findOne({$or: [{username},{email},{trxWallet}]});

        if(usedUser){
            let property = "";
            if(usedUser.username === username) property = "Username";
            else if(usedUser.email === email) property = "Email"
            else if(usedUser.trxWallet === trxWallet) property = "Tron Wallet"

            throw new HttpException(`${property} already in use`, HttpStatus.CONFLICT);
        }

        newUserDto.password = await hash(password, 10);

        return await this.userModel.create(newUserDto);

    }

}
