import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Reading } from '../entities/reading.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: 0 })
  totalBooksRead: number;

//   @Column({ default: 0 })
//   totalPagesRead: number;

//   @Column({ type: 'text', nullable: true })
//   readingPreferences: string;

  @OneToMany(() => Reading, reading => reading.user)
  readings: Reading[];

} 