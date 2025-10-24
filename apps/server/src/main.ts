/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appConfig } from './app/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS using configuration
  app.enableCors(appConfig.cors);
  
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  await app.listen(appConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${appConfig.port}/${globalPrefix}`
  );
}

bootstrap();
