import { Module } from '@nestjs/common';
import { AuthRepository } from './AuthRepository';
import { BookmarkRepository } from './BookmarkRepository';
import { UserRepository } from './UserRepository';

@Module({
  providers: [AuthRepository, UserRepository, BookmarkRepository],
  exports: [AuthRepository, UserRepository, BookmarkRepository],
})
export class PresistenceModule {}
