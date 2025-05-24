import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Book, Author } from './types/book.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }

  // @Get('/home')
  // getLibraryBooks() {
  //   console.log('gate way app conroller ')
  //   return this.appService.getBooks();
  // }
  @Get('/home')
  async getBooks(): Promise<Book[]> {
    return this.appService.getBooks();
  }

  @Post('/books')
  async createBook(
    @Body() data: { title: string; author: string; genre: string },
  ): Promise<Book> {
    return this.appService.createBook(data);
  }

  @Get('/authors')
  async getAuthors(): Promise<Author[]> {
    return this.appService.getAuthors();
  }

}
