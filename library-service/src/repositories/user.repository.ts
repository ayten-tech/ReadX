import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

@Injectable()
//class encapsulates all the database logic related to the User entity and their associated Books.
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    //used for accessing books when linking them to users.
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
//instead of find by email make find by username
  // async findByEmail(email: string): Promise<User> {
  //   const user = await this.repository.findOne({
  //     where: { email },
  //     relations: ['books'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found`);
  //   }
  //   return user;
  // }
  
  // two joins: one for user and books, another for books and authors
  //so we can get book title, genre and author name in response instead of the whole data
  // this time unlike previous functionalitis where we pass query params
  //instead we pass it as a body {username: string}
  async findByUsername(username: string){
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.books', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .select([
        'user.id',
        'user.username',
        // 'user.email',
        // 'book.id',
        'book.title',
        'book.genre',
        'author.name'
      ])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }

    return user;
  }
  
  

  async create(data: Partial<User>): Promise<Omit<User, 'password'>> {
    const user = this.repository.create(data);
    const savedUser = await this.repository.save(user);
    // Exclude password from the response
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async wishToRead(userId: number, bookId: number): Promise<any> {
    try {
      // First check if user exists
      const user = await this.repository.findOne({
        where: { id: userId },
        relations: ['books'],
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Then check if book exists
      const book = await this.bookRepository.findOne({
        where: { id: bookId },
        relations: ['author'],
      });
      
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }

      // Check if user already has this book
      if (user.books && user.books.some(b => b.id === bookId)) {
        throw new ConflictException(`Book "${book.title}" is already in ${user.username}'s wish list`);
      }

      // Add book to user's collection
      if (!user.books) {
        user.books = [];
      }
      user.books.push(book);
      
      // Save the user
      await this.repository.save(user);

      // Return only the specified fields using QueryBuilder
      const updated_user_books = await this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.books', 'book')
        .leftJoinAndSelect('book.author', 'author')
        .select([
          'user.id',
          'user.username',
          'book.id',
          'book.title',
          'author.name'
        ])
        .where('user.id = :userId', { userId })
        .getOne();

      if (!updated_user_books) {
        throw new InternalServerErrorException('Failed to retrieve updated user data');
      }

      return updated_user_books;
    } catch (error) {
      // If it's already a NestJS HTTP exception, rethrow it
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      
      // Throw a generic internal server error
      throw new InternalServerErrorException(
        `Failed to add book to wish list: ${error.message}`
      );
    }
  }

  // async removeBookFromUser(userId: number, bookId: number): Promise<User> {
  //   const user = await this.findById(userId);
  //   user.books = user.books.filter(book => book.id !== bookId);
  //   return this.repository.save(user);
  // }

  // async getUserBooks(userId: number): Promise<Book[]> {
  //   const user = await this.findById(userId);
  //   return user.books;
  // }
} 