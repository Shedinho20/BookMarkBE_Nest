import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { BookmarkRepository } from '../../Presistence/BookmarkRepository';
import { CreateBookmarkRequest, EditBookmarkRequest } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  getBookmarks(userId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks(userId);
  }

  getBookmarkById(userId: number, bookmarkId: number): Promise<Bookmark> {
    return this.bookmarkRepository.getBookmarkById(userId, bookmarkId);
  }

  createBookmark(userId: number, bookmark: CreateBookmarkRequest): Promise<Bookmark> {
    return this.bookmarkRepository.createBookmark(userId, bookmark);
  }

  editBookmark(userId: number, bookmarkId: number, bookmark: EditBookmarkRequest): Promise<Bookmark> {
    return this.bookmarkRepository.editBookmark(userId, bookmarkId, bookmark);
  }

  async deleteBookmark(userId: number, bookmarkId: number): Promise<Boolean> {
    try {
      await this.bookmarkRepository.deleteBookmark(userId, bookmarkId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
