import { IsNumber, IsNotEmpty } from 'class-validator';

export class WishToReadDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;
} 