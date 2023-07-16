import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './Modules';
import { BookmarksModule } from './Modules/bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BookmarksModule, PrismaModule],
})
export class AppModule {}
