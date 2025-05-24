import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { User } from './entities/user.entity';
import { BookRepository } from './repositories/book.repository';
import { AuthorRepository } from './repositories/author.repository';
import { UserRepository } from './repositories/user.repository';
//we implement required endpoints here using functions from repositories
@Injectable()
export class AppService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // Home page endpoint - Get all books
  @MessagePattern({ cmd: 'get_books' })
  async getBooks() {
    return this.bookRepository.findAll();
  }


  @MessagePattern({ cmd: 'create_book' })
  async createBook(data: { title: string; author: string; genre: string }) {
    // First create or find the author
    const author = await this.authorRepository.create({ name: data.author });
    // Then create the book with the author
    return this.bookRepository.create({
      title: data.title,
      genre: data.genre,
      author: author
    });
  }


  @MessagePattern({ cmd: 'get_all_authors' })
  async getAllAuthors() {
    return this.authorRepository.findAll();
  }
}