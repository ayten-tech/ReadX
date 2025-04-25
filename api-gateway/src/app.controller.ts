import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
//calls the client from the controller
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @Get('/home')
  // getLibraryBooks() {
  //   console.log('gate way app conroller ')
  //   return this.appService.getBooks();
  // }
  @Get('/home')
  async getBooks() {
    return this.appService.getBooks();
  }
}
