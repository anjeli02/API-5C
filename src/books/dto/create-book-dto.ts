import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty({ message: 'Name is required' })
    readonly name: string;

    @IsNotEmpty({ message: 'Author is required' })
    readonly author: string;

    @IsNotEmpty({message: 'ISBN is required'})
    readonly isbn: string;

    @IsNotEmpty({message: 'Published year must be a number'})
    @IsInt({message: 'Published year must be an integer'})
    readonly publishedYear: number;
}