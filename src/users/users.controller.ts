import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}


    @Get()
    @ApiOperation({ 
        summary: "Get All Users",
        description: "Get all the users",
    })
    async getUsers(){
        return await this.usersService.getUsers();
    }

}
