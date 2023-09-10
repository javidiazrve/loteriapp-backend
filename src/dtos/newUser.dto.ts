import { ApiProperty } from "@nestjs/swagger";


export class NewUserDto {

    @ApiProperty({
        type: String,
        description: "The users name",
        example: "Pedro",
        required: true,
    })
    name: string;
    
    @ApiProperty({
        type: String,
        description: "The users lastname",
        required: true,
        example: "Perez"
    })
    lastname: string;

    @ApiProperty({
        type: String,
        description: "The users email",
        required: true,
        example: "Pedro Perez"
    })
    email: string;

    @ApiProperty({
        type: String,
        description: "The users password",
        required: true,
        example: "123456hola"
    })
    password: string;
}