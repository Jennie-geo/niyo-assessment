import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
//import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    UsersModule,

    // JwtModule.register({
    //   secret: `${process.env.JWT_SECRET}`,
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
})
export class AppModule {}
