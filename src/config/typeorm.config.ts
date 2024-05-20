import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'niyo',
  password: 'niyo',
  database: 'assessment',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
