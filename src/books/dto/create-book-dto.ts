import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateBookDto{
    @IsNotEmpty({message: 'nama harus diisi'})
    readonly name: string;

    @IsNotEmpty({message: 'author harus diisi'})
    readonly author: string;

    @IsNotEmpty({message: 'isbn harus diisi'})
    readonly isbn: string;

    @IsNotEmpty({message: 'tahun terbit harus diisi'})
    @IsInt({message: 'tahun terbit harus berupa angka'})    
    readonly publishedYear: number;
}