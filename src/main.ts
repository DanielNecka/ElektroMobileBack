import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    stopAtFirstError: false,
    exceptionFactory: (errors) => {
      console.error('Validation errors:', JSON.stringify(errors, null, 2));
      const messages = errors.map(error => ({
        field: error.property,
        errors: Object.keys(error.constraints || {}).map(key => error.constraints![key])
      }));
      return new BadRequestException(messages);
    }
  }));
  app.enableCors({
    origin: ['http://localhost:4200', 'https://localhost:4200'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Energia API')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}
bootstrap();