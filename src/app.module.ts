import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { BooksService } from './books/books.service.js';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService, BooksService],
})
export class AppModule {}
