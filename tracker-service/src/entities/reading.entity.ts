import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum ReadingStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAUSED = 'paused'
}

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.readings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 255 })
  bookTitle: string;


  @Column({ type: 'int', default: 0 })
  currentPage: number;

  @Column({ type: 'int' })
  totalPages: number;

  @Column({
    type: 'enum',
    enum: ReadingStatus,
    default: ReadingStatus.NOT_STARTED
  })
  status: ReadingStatus;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  completionDate: Date;

//   @Column({ type: 'text', nullable: true })
//   notes: string;

  @Column({ type: 'float', default: 0 })
  readingProgress: number;

//   @CreateDateColumn()
//   createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 