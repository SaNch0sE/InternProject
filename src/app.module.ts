import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { Books } from './books/books.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MURL || process.env.MONGO_URI,
      database: 'Books',
      entities: [Books, Users],
      logging: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
    }),
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
