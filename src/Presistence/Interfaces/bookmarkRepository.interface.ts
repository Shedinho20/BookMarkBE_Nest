export interface CreateBookmarkRequest {
  title: string;
  description?: string;
  link: string;
}

export interface EditBookmarkRequest {
  title?: string;
  description?: string;
  link?: string;
}
