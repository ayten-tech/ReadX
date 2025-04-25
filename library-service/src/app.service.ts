import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private books = ['The NestJS Book', 'Microservices in Action', 'TypeScript Basics'];

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): string[] {
    console.log('Received request for books');
    return this.books;
  }
}