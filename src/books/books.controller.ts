import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Param } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto.js';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}
    //menampilkan data atau mengambil data
    @Get()
    getAllBooks() {
        return this.bookService.findAll();
    }

    //mengambil data buku berdasarkan id
    @Get(':id')
    getBookById(@Param('id') id: string) {
        //logic untuk mengambil data buku berdasarkan id
        return this.bookService.findOne(Number(id));
    }

    //menyimpan data buku baru ke databasse
    @Post()
    createBook(@Body() book: CreateBookDto) {
        //logic untuk menyimpan data buku baru ke database
        return this.bookService.create(book);
    }

    //mengupdate data buku berdasarkan id
    @Put(':id')
    updateBook(@Param('id') id: string, @Body() book: CreateBookDto) {
        //logic untuk mengupdate data buku berdasarkan id
        return this.bookService.update(Number(id), book);
    }

    //menghapus data buku berdasarkan id
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        //logic untuk menghapus data buku berdasarkan id
        return this.bookService.delete(Number(id));
    }
}


