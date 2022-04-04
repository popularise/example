import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      host: process.env.DB_HOST,
      type: process.env.DB_CONNECTION as 'postgres' | 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT as unknown as number,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: true,
      migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
      migrationsRun: true,
      entities: [path.join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    };
  }
}
