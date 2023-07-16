import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}

export class EditBookmarkRequest {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

export interface BookmarkResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  link: string;
  userId: number;
}
