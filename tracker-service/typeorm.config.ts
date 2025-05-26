import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Reading } from './src/entities/reading.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  username: process.env.DB_USERNAME || 'tracker_user',
  password: process.env.DB_PASSWORD || 'tracker_password',
  database: process.env.DB_DATABASE || 'tracker_db',
  entities: [User, Reading],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
}); 