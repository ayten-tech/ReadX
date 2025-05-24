import { Controller, Get, Post, Query, Body, Param, BadRequestException } from '@nestjs/common';
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

  @Post('/author')
  async createAuthor(
    @Body() data: { 
      name: string; 
      biography?: string;
      books: {
        title: string;
        genre: string;
      }[];
    },
  ): Promise<Author> {
    if (!data.books || data.books.length === 0) {
      throw new BadRequestException('At least one book is required when creating an author');
    }
    return this.appService.createAuthor(data);
  }

  //get author info (description & books)
  @Get('/author/:id')
  async getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.appService.getAuthorById(id);
  }

  // @Get('/authors/name/:name')
  // async getAuthorByName(@Param('name') name: string): Promise<Author | null> {
  //   return this.appService.getAuthorByName(name);
  // }

  //get all books of author no author info just books
  @Get('/author/:id/books')
  async getAuthorBooks(@Param('id') id: number): Promise<Book[]> {
    return this.appService.getAuthorBooks(id);
  }

  //search books by title(name)
  @Get('/books/search')
  async searchBooks(
    @Query('title') title: string,
  ): Promise<Book[]> {
    if (!title) {
      throw new BadRequestException('Title parameter is required for search');
    }
    return this.appService.searchBooks({ title });
  }

  //get all books of a specific genre
  @Get('/books/genre/:genre')
  async getBooksByGenre(@Param('genre') genre: string): Promise<Book[]> {
    return this.appService.getBooksByGenre(genre);
  }

}
