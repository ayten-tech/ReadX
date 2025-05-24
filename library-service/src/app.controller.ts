import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
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

  @MessagePattern({ cmd: 'get_all_authors' })
  async getAllAuthors() {
    return this.appService.getAllAuthors();
  }
}
