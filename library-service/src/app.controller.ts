import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }

  @MessagePattern({ cmd: 'get_books' })
  async getBooks() {
    return this.appService.getBooks();
  }


  @MessagePattern({ cmd: 'create_book' })
  async createBook(data: { title: string; author: string; genre: string }) {
    return this.appService.createBook(data);
  }


  @MessagePattern({ cmd: 'create_author' })
  async createAuthor(data: { 
    name: string; 
    biography?: string;
    books: {
      title: string;
      genre: string;
    }[];
  }) {
    return this.appService.createAuthor(data);
  }

  @MessagePattern({ cmd: 'get_author_by_id' })
  async getAuthorById(id: number) {
    return this.appService.getAuthorById(id);
  }

  @MessagePattern({ cmd: 'get_author_by_name' })
  async getAuthorByName(name: string) {
    return this.appService.getAuthorByName(name);
  }

  @MessagePattern({ cmd: 'get_author_books' })
  async getAuthorBooks(authorId: number) {
    return this.appService.getAuthorBooks(authorId);
  }

  @MessagePattern({ cmd: 'search_books' })
  async searchBooks(criteria: { title: string }) {
    return this.appService.searchBooks(criteria);
  }

  @MessagePattern({ cmd: 'get_books_by_genre' })
  async getBooksByGenre(genre: string) {
    return this.appService.getBooksByGenre(genre);
  }

  @MessagePattern({ cmd: 'get_all_authors' })
  async getAllAuthors() {
    return this.appService.getAllAuthors();
  }

  @MessagePattern({ cmd: 'find_user_by_username' })
  async findUserByUsername(data: { username: string }) {
    return this.appService.findUserByUsername(data.username);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: CreateUserDto) {
    return this.appService.createUser(data);
  }

  @MessagePattern({ cmd: 'wish_to_read' })
  async wishToRead(data: { userId: number; bookId: number }) {
    return this.appService.wishToRead(data.userId, data.bookId);
  }
}
