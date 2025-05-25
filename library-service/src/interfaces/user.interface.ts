export interface User {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 