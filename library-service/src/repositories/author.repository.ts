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
      //return them ascendingly when we returning all authors endpoint
      order: {
        id: 'ASC'
      }
    });
  }

 async create(data: Partial<Author>): Promise<Author> {
    const author = this.repository.create(data);
    return this.repository.save(author);
  }

  async findById(id: number): Promise<Author> {
    const author = await this.repository.findOne({
      where: { id },
      relations: ['books'],
    });
    //handling excption , finding an author with an id that doesn't exist
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async findByName(name: string): Promise<Author | null> {
    return this.repository.findOne({
      where: { name },
      relations: ['books'],
    });
  }

  //returns books of author {id, bookname,id bookname}
//returns only books of author no author data since the promise is books Promise<Book[]>
  async getAuthorBooks(authorId: number): Promise<Book[]> { 
    const author = await this.findById(authorId);
    return author.books;
  }

} 