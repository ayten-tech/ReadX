import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add global prefix 'api' to all routes
  app.setGlobalPrefix('api');
  //API Gateway Listens for HTTP requests (from client/browser) on port 3000
  //API Gateway ➝ Library	3001 Sends TCP messages to Library service
  //Library Service 3001 Listens for TCP messages from Gateway
  await app.listen(3000);
  console.log('API Gateway is running on port 3000');
}
bootstrap();
