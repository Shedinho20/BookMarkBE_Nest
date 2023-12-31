import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PresistenceModule } from '../../Presistence/presistence.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [PresistenceModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
