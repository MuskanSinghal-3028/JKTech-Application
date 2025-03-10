import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, 
  });

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('BACKEND APIs DOCUMENT')
    .setDescription('Api description')
    .setVersion('1.0.0')
    .addTag('BACKEND')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //to validate every incoming request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //to handle large json data
  app.use(bodyParser.json({ limit: '50mb' }));

  const port = configService.get('PORT') || 5600;
  const host = configService.get('HOST') || '';

  await app.listen(port, host, () => {
    console.log("Backend Running successfully", port);
  });
}
bootstrap();
