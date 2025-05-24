import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Book, Author } from './types/book.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('LIBRARY') private readonly libraryClient: ClientProxy,
  ) {}

  async getBooks(): Promise<Book[]> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_books' }, {}));
  }

  async createBook(data: { title: string; author: string; genre: string }): Promise<Book> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'create_book' }, data));
  }
  
  async getAuthors(): Promise<Author[]> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_all_authors' }, {}));
  }

  async createAuthor(data: { 
    name: string; 
    biography?: string;
    books: {
      title: string;
      genre: string;
    }[];
  }): Promise<Author> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'create_author' }, data));
  }

  async getAuthorById(id: number): Promise<Author> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_author_by_id' }, id));
  }

  async getAuthorByName(name: string): Promise<Author | null> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_author_by_name' }, name));
  }

  async getAuthorBooks(id: number): Promise<Book[]> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_author_books' }, id));
  }

  async searchBooks(criteria: { title: string }): Promise<Book[]> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'search_books' }, criteria));
  }

  async getBooksByGenre(genre: string): Promise<Book[]> {
    return firstValueFrom(this.libraryClient.send({ cmd: 'get_books_by_genre' }, genre));
  }
}