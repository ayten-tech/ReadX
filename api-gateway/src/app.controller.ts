import { Controller, Get, Post, Query, Body, Param, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { Book, Author } from './types/book.interface';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { WishToReadDto } from './dto/wish-to-read.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

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
// implemented class validator in dto since we pass body instead of query params
//so we need to validate that body (username not empty and string)
//return user infor and books in wish list
  @Post('/user/find')
  async getUserByUsername(@Body() body: FindUserDto){
    return this.appService.findUserByUsername(body.username);
  }
//create user
  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }
//add book to user wish list
  @Post('/user/wish-to-read')
  async wishToRead(@Body() wishToReadDto: WishToReadDto) {
    this.logger.log(`[1. Controller] Starting wish-to-read request for user ${wishToReadDto.userId} and book ${wishToReadDto.bookId}`);
    
    try {
      // Validate input
      if (!wishToReadDto.userId || !wishToReadDto.bookId) {
        this.logger.error('[1. Controller] Invalid input: userId or bookId is missing');
        throw new BadRequestException('userId and bookId are required');
      }

      this.logger.debug(`[1. Controller] Request payload: ${JSON.stringify(wishToReadDto)}`);
      
      // Call service
      this.logger.log('[1. Controller] Calling service layer...');
      const result = await this.appService.wishToRead(wishToReadDto);
      
      this.logger.log('[1. Controller] Successfully processed wish-to-read request');
      this.logger.debug(`[1. Controller] Response: ${JSON.stringify(result)}`);
      
      return result;
    } catch (error) {
      this.logger.error(`[1. Controller] Error in wishToRead:`, {
        error: error.message,
        stack: error.stack,
        code: error.code,
        status: error.status,
        response: error.response
      });

      // Handle specific error types
      if (error.status) {
        this.logger.error(`[1. Controller] HTTP Exception: ${error.status} - ${error.message}`);
        throw error;
      }
      
      if (error.code === 'ECONNREFUSED') {
        this.logger.error('[1. Controller] Connection refused - Library service might be down');
        throw new InternalServerErrorException('Library service is not available');
      }

      // Log the full error for debugging
      this.logger.error('[1. Controller] Unexpected error:', error);
      throw new InternalServerErrorException(
        `Failed to process wish-to-read request: ${error.message}`
      );
    }
  }
}
