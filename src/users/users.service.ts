import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from 'src/dtos/newUser.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async getUsers(){

        return await this.userModel.find();

    }

    async createUser(newUserDto: NewUserDto){

        return await this.userModel.create(newUserDto);

    }

}
