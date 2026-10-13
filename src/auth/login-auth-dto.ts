import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Email tidak valid' })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  email: string;

  @IsString({ message: 'Password harus berupa teks' })
  @IsNotEmpty({ message: 'Password wajib diisi' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}