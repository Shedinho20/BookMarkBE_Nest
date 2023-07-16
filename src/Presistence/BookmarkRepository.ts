import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkRequest, EditBookmarkRequest } from './Interfaces/bookmarkRepository.interface';

@Injectable({})
export class BookmarkRepository extends PrismaService {
  constructor() {
    super();
  }

  async createBookmark(userId: number, bookmark: CreateBookmarkRequest): Promise<Bookmark> {
    const cretedBookmark = this.bookmark.create({
      data: { userId, ...bookmark },
    });

    return cretedBookmark;
  }

  getBookmarks(userId: number): Promise<Bookmark[]> {
    const bookmarks = this.bookmark.findMany({
      where: { userId: userId },
    });

    return bookmarks;
  }

  getBookmarkById(userId: number, bookmarkId: number): Promise<Bookmark> {
    const bookmark = this.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });

    return bookmark;
  }

  editBookmark(userId: number, bookmarkId: number, bookmark: EditBookmarkRequest) {
    const editedBookmark = this.bookmark.update({
      where: {
        id: bookmarkId,
        userId,
      },
      data: {
        ...bookmark,
      },
    });

    return editedBookmark;
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
    this.bookmark.delete({ where: { id: bookmarkId, userId } });

    const bookmark = await this.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) throw new ForbiddenException('Access to resources denied');

    return this.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
