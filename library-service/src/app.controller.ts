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


  @MessagePattern({ cmd: 'get_all_authors' })
  async getAllAuthors() {
    return this.appService.getAllAuthors();
  }
}
