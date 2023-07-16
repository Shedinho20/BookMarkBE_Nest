import { Module } from '@nestjs/common';
import { PresistenceModule } from '../../Presistence/presistence.module';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PresistenceModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
