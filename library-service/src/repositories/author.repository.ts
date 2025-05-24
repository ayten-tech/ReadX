import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Author[]> { //returns authors data first then books data nested columns
    return this.repository.find({
      relations: ['books'],
    });
  }

 

} 