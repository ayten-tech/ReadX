import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Reading } from './entities/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'tracker_user',
      password: process.env.DB_PASSWORD || 'tracker_password',
      database: process.env.DB_DATABASE || 'tracker_db',
      entities: [User, Reading],
      synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
    }),
    TypeOrmModule.forFeature([User, Reading]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
