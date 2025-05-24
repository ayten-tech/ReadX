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


  //1st creates author then creates book/books for that author in one go 
  //example of the json body:
  // {
  //   "name": "henery ford",
  //   "biography": "British author best known for the Harry Potter series",
  //   "books": [
  //     {
  //       "title": "new york",
  //       "genre": "horror",
  //       "dateOfEstablished": "2025-05-23T13:49:24.802Z"
  //     },
  //      {
  //       "title": "chicago",
  //       "genre": "horror",
  //       "dateOfEstablished": "2025-05-23T13:49:24.802Z"
  //     }
  //   ]
  // }
  @MessagePattern({ cmd: 'create_author' })
  //json at least when creatiing an author , the author has to
  //have at least one book that's the validation
  //you can also add several books at once when crearing an author
  async createAuthor(data: { 
    name: string; 
    biography?: string;
    books: {
      title: string;
      genre: string;
    }[];
  }) {
    // First create the author
    const author = await this.authorRepository.create({
      name: data.name,
      biography: data.biography
    });

    // Then create all the books for this author
    const books = await Promise.all(
      data.books.map(bookData => 
        this.bookRepository.create({
          title: bookData.title,
          genre: bookData.genre,
          author: author
        })
      )
    );

    // Return the author with all their books
    return this.authorRepository.findById(author.id);
  }

  @MessagePattern({ cmd: 'get_author_by_id' })
  async getAuthorById(id: number) {
    return this.authorRepository.findById(id);
  }

  @MessagePattern({ cmd: 'get_author_by_name' })
  async getAuthorByName(name: string) {
    return this.authorRepository.findByName(name);
  }

  @MessagePattern({ cmd: 'get_author_books' })
  async getAuthorBooks(authorId: number) {
    return this.authorRepository.getAuthorBooks(authorId);
  }

  @MessagePattern({ cmd: 'search_books' })
  async searchBooks(criteria: { title: string }) {
    return this.bookRepository.search(criteria);
  }

  @MessagePattern({ cmd: 'get_books_by_genre' })
  async getBooksByGenre(genre: string) {
    return this.bookRepository.findByGenre(genre);
  }
}