import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Book, Author } from './types/book.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { WishToReadDto } from './dto/wish-to-read.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

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

  async findUserByUsername(username: string){
    return firstValueFrom(this.libraryClient.send({ cmd: 'find_user_by_username' }, { username }));
  }

  async createUser(createUserDto: CreateUserDto) {
    return firstValueFrom(this.libraryClient.send({ cmd: 'create_user' }, createUserDto));
  }

  async wishToRead(wishToReadDto: WishToReadDto) {
    this.logger.log(`[2. Gateway Service] Processing wish-to-read request for user ${wishToReadDto.userId} and book ${wishToReadDto.bookId}`);
    
    try {
      // Validate microservice connection
      if (!this.libraryClient) {
        this.logger.error('[2. Gateway Service] Library client is not initialized');
        throw new InternalServerErrorException('Library service connection is not available');
      }

      this.logger.debug(`[2. Gateway Service] Sending request to library service: ${JSON.stringify(wishToReadDto)}`);
      
      // Send request to library service
      const result = await firstValueFrom(
        this.libraryClient.send(
          { cmd: 'wish_to_read' },
          { userId: wishToReadDto.userId, bookId: wishToReadDto.bookId }
        )
      ).catch(error => {
        this.logger.error('[2. Gateway Service] Error from library service:', {
          error: error.message,
          code: error.code,
          response: error.response
        });
        throw error;
      });
      
      this.logger.log('[2. Gateway Service] Successfully received response from library service');
      this.logger.debug(`[2. Gateway Service] Response: ${JSON.stringify(result)}`);
      
      return result;
    } catch (error) {
      this.logger.error('[2. Gateway Service] Error in wishToRead:', {
        error: error.message,
        stack: error.stack,
        code: error.code,
        response: error.response
      });

      // Handle specific error types
      if (error.code === 'ECONNREFUSED') {
        this.logger.error('[2. Gateway Service] Connection refused - Library service is not available');
        throw new InternalServerErrorException('Library service is not available. Please try again later.');
      }

      if (error.response) {
        this.logger.error('[2. Gateway Service] Library service error response:', error.response);
        throw error.response;
      }

      // Log the full error for debugging
      this.logger.error('[2. Gateway Service] Unexpected error:', error);
      throw new InternalServerErrorException(
        `Failed to communicate with library service: ${error.message}`
      );
    }
  }
}