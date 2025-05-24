import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { User } from './entities/user.entity';
import { BookRepository } from './repositories/book.repository';
import { AuthorRepository } from './repositories/author.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'library_db',
      entities: [Book, Author, User],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: ['error', 'warn', 'migration'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([Book, Author, User]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BookRepository,
    AuthorRepository,
    UserRepository,
  ],
})
export class AppModule {}
