import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Bookmark } from '@prisma/client';
import { GetUser } from '../auth/decorator/getUser';
import { BookmarkService } from './bookmark.service';
import { BookmarkResponse, CreateBookmarkRequest, EditBookmarkRequest } from './dto/bookmark.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getBookmarks(@GetUser('id') userId: number): Promise<BookmarkResponse[]> {
    const response = await this.bookmarkService.getBookmarks(userId);

    return response.map(bookmark => this.mapBookmark(bookmark));
  }

  @Get(':id')
  async getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): Promise<BookmarkResponse> {
    const response = await this.bookmarkService.getBookmarkById(userId, bookmarkId);

    return this.mapBookmark(response);
  }

  @Post()
  async createBookmark(
    @GetUser('id') userId: number,
    @Body() bookmark: CreateBookmarkRequest,
  ): Promise<BookmarkResponse> {
    const response = await this.bookmarkService.createBookmark(userId, bookmark);

    return this.mapBookmark(response);
  }

  @Patch(':id')
  async editBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() bookmark: EditBookmarkRequest,
  ): Promise<BookmarkResponse> {
    const response = await this.bookmarkService.editBookmark(userId, bookmarkId, bookmark);

    return this.mapBookmark(response);
  }

  /**
   * TODO :Fix delete bookmark request
   * */

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
    const response = await this.bookmarkService.deleteBookmark(userId, bookmarkId);

    if (response) return response;

    return;
  }

  private mapBookmark(bookmark: Bookmark): {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    link: string;
    userId: number;
  } {
    return {
      id: bookmark.id,
      createdAt: bookmark.createdAt,
      updatedAt: bookmark.updatedAt,
      title: bookmark.title,
      description: bookmark.description,
      link: bookmark.link,
      userId: bookmark.userId,
    };
  }
}
