import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';

@Injectable()
export class BookRepository {
  //These allow you to interact with the database using TypeORM methods (e.g. find, save, delete).
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repository.find({
      //That means instead of returning just the book data with a foreign key like authorId, it fetches the full Author object as part of each Book.
      // this case id  name and biography of the author -> defined in Many to one in book entity
      relations: ['author'],
      order: {
        dateOfEstablished: 'DESC'
      }
    });
  }

  async create(data: Partial<Book>): Promise<Book> {
    const book = this.repository.create(data);
    return this.repository.save(book);
  }
} 