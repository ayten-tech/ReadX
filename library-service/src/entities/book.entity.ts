import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Author } from './author.entity';
import { User } from './user.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 100 })
  genre: string;

  @CreateDateColumn({ name: 'date_of_established' })
  dateOfEstablished: Date;

  //you can leave it as it is withoout adding joining colunmn
  //TypeORM will automatically add a foreign key column authorId in the books table because @ManyToOne is the owning side by default.
  //but if you will add join column you must add it on the many side like this entity
  @ManyToOne(() => Author, author => author.books)
  author: Author;

  @ManyToMany(() => User, user => user.books)
  @JoinTable({
    name: 'users_books',
    //join column referes to the current entity (book entity), reverse is the other side (user entity)
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  users: User[];

  // @UpdateDateColumn({ name: 'updated_at' })
  // updatedAt: Date;

  // Optional: Add a constructor for creating new books
  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
} 