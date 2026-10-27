import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}  // constructor untuk menginisialisasi service

    // menampilkan data atau mengambil data
    @Get()
    getAllBooks(){   //awalnya getAllBooks: string()
        // logic untuk mengambil semua data buku dari database
        return this.bookService.findAll();
    }

    // mengambil data buku berdasarkan id
    @Get(':id ')
    getBookById(@Param('id') id: string){  // @Param digunakan untuk mengambil parameter dari URL
        //logic untuk mengambil data buku berdasarkan id dari database
        return this.bookService.findOne((id));  // mengubah id dari string ke number
    }

    //menyimpan data buku baru ke database
    @Post()
    createBook(@Body() book: CreateBookDto){  // @Body digunakan untuk mengambil data dari body request
        //logic untuk menyimpan data buku baru ke database
        return this.bookService.create(book);
    }

    //mengupdate data buku berdasarkan id
    @Put(':id')
    updateBook(
        @Param('id') id: string, 
        @Body() book: CreateBookDto
    ){  
        // @Param digunakan untuk mengambil parameter dari URL, @Body digunakan untuk mengambil data dari body request
        //logic untuk mengupdate data buku berdasarkan id dari database
        return this.bookService.update((id), book);  // mengubah id dari string ke number
    }

    //menghapus data buku berdasarkan id
    @Delete(':id')
    deleteBook(@Param('id') id: string
    ){  
        // @Param digunakan untuk mengambil parameter dari URL
        //logic untuk menghapus data buku berdasarkan id dari database
        return this.bookService.delete((id));  // mengubah id dari string ke number
    }

}
    