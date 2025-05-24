import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date;

// one to many relationship with book entity
//one author can have many books
  @OneToMany(() => Book, book => book.author)
  books: Book[];
} 