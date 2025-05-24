export interface Book {
  id: number;
  title: string;
  genre: string;
  dateOfEstablished: Date;
  author: Author;
}

export interface Author {
  id: number;
  name: string;
  biography?: string;
  books?: Book[];
} 