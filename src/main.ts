import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set validation
  app.useGlobalPipes(new ValidationPipe());
  // sets secure headers globally
  app.use(helmet());
  // enables cors requests to our api
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`,'Bootstrap');
}

bootstrap();
