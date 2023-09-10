import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY"),
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
