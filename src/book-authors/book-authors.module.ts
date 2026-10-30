import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookAuthorsController } from './book-authors.controller.js';
import { BookAuthorsService } from './book-authors.service.js';
import { BookAuthor } from './entities/book-author.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BookAuthor])],
  controllers: [BookAuthorsController],
  providers: [BookAuthorsService],
})
export class BookAuthorsModule {}