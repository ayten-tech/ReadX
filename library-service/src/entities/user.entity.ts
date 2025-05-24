import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  //will implement hashing later on 
  @Column({ length: 255 })
  password: string;


  @ManyToMany(() => Book, book => book.users)
  books: Book[];
} 