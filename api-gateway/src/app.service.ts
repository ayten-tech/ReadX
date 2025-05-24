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

 
}