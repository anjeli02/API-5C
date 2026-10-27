import { Injectable } from '@nestjs/common';
import { User } from './entities/user-entity.js';
import { RegisterAuthDto } from './dto/register-auth-dto.js';
import { LoginAuthDto } from './dto/login-auth-dto.js';
import { ForgotPasswordDto } from './dto/forgot-password-dto.js';
import { ResetPasswordDto } from './dto/reset-password-dto.js';

@Injectable()
export class AuthService {

    private users: User[] = [
        {
            id: 1,
            name: 'User 1',
            email: 'user1@gmail.com',
            password: '123456'
        }
    ];

    private resetTokens: { email: string; token: string }[] = [];

    // REGISTER
    register(data: RegisterAuthDto) {

        if (data.password !== data.passwordConfirmation) {
            return {
                message: 'Password confirmation tidak cocok'
            };
        }

        const existingUser = this.users.find(
            user => user.email === data.email
        );

        if (existingUser) {
            return {
                message: 'Email sudah terdaftar'
            };
        }

        const newUser: User = {
            id: this.users.length + 1,
            name: data.name,
            email: data.email,
            password: data.password
        };

        this.users.push(newUser);

        return {
            message: 'Register berhasil',
            data: newUser
        };
    }


    // LOGIN
    login(data: LoginAuthDto) {

        const user = this.users.find(
            user =>
                user.email === data.email &&
                user.password === data.password
        );

        if (!user) {
            return {
                message: 'Email atau password salah'
            };
        }

        return {
            message: 'Login berhasil',
            data: user
        };
    }


    // FORGOT PASSWORD
    forgotPassword(data: ForgotPasswordDto) {

        const user = this.users.find(
            user => user.email === data.email
        );

        if (!user) {
            return {
                message: 'Email tidak ditemukan'
            };
        }

        const token = 'RESET-' + Date.now();

        this.resetTokens.push({
            email: data.email,
            token: token
        });

        return {
            message: 'Token reset password berhasil dibuat',
            token: token
        };
    }


    // RESET PASSWORD
    resetPassword(data: ResetPasswordDto) {

        const resetData = this.resetTokens.find(
            item => item.token === data.token
        );

        if (!resetData) {
            return {
                message: 'Token tidak valid'
            };
        }

        if (data.password !== data.passwordConfirmation) {
            return {
                message: 'Password confirmation tidak cocok'
            };
        }

        const user = this.users.find(
            user => user.email === resetData.email
        );

        if (!user) {
            return {
                message: 'User tidak ditemukan'
            };
        }

        user.password = data.password;

        this.resetTokens = this.resetTokens.filter(
            item => item.token !== data.token
        );

        return {
            message: 'Password berhasil direset'
        };
    }
}