import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if (process.env.NODE_ENV === 'development')
    app.enableCors({
      origin: '*',
    });
  await app.listen(configService.get<string>('BACKEND_PORT'));
}
bootstrap();
