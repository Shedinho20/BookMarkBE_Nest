import { Module } from '@nestjs/common';
import { PresistenceModule } from '../../Presistence/presistence.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [PresistenceModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarksModule {}
