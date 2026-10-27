import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()    // @ bacanya decorator, digunakan untuk menandai class sebagai service yang dapat di-inject ke dalam controller atau service lain.
export class BooksService {
    // data dari database, sementara ini menggunakan array untuk menyimpan data buku
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>     
    ){}

    // menampilkan data buku dari database
    async findAll(): Promise<Book[]> {
        return this.bookRepository.find({
            order: {createdAt: 'DESC'}
        });
    }

    // mengambil data buku berdasarkan id dari database
    async findOne(id: string): Promise<Book> {
        const book = await this.bookRepository.findOneBy({id});

        // jika buku tidak ditemukna
        if (!book) {
            throw new NotFoundException(`Buku tidak ditemuakan`);
        }
        return book;
    }

    // menyimpan data buku baru ke database
    async create(book: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(book)

        return await this.bookRepository.save(newBook);
        }

        
    // mengupdate data buku berdasarkan id dari database
    async update(id: string, book: CreateBookDto): Promise<Book> {
        const indexBook = await this.findOne(id);
            
        //update data buku
        const updatedBook = this.bookRepository.merge(indexBook, book);
        return await this.bookRepository.save(updatedBook);
    }

    // menghapus data buku berdasarkan id dari database
    async delete(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findOne(id);
        await this.bookRepository.softDelete(id);
        return { message: 'Buku berhasil dihapus', deletedId: id };
    }
}
        