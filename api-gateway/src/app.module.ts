import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    //register micro-service client in app.module
    ClientsModule.register([
      {
        //Expecting library service to listen on port 3001
        name: 'LIBRARY',
        transport: Transport.TCP,
        options: {
          // Use the Docker service name instead of localhost
          host: 'library-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
