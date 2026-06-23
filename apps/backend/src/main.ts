import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Readora API')
    .setDescription('AI Powered Book Discovery Platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  console.log('PORT:', process.env.PORT);
  console.log('APP_NAME:', process.env.APP_NAME);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application running on: http://localhost:3000`);
  console.log(`Swagger running on: http://localhost:3000/api`);

}

bootstrap();