import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('LIBRARY') private readonly libraryClient: ClientProxy,
  ) {}

  async getBooks() {
    return this.libraryClient.send({ cmd: 'get_books' }, {});
  }
  
}