import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

import { RegisterAuthDto } from './dto/register-auth-dto.js';
import { LoginAuthDto } from './dto/login-auth-dto.js';
import { ForgotPasswordDto } from './dto/forgot-password-dto.js';
import { ResetPasswordDto } from './dto/reset-password-dto.js';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    // LOGIN
    @Post('login')
    login(@Body() data: LoginAuthDto) {
        return this.authService.login(data);
    }

    // REGISTER
    @Post('register')
    register(@Body() data: RegisterAuthDto) {
        return this.authService.register(data);
    }

    // FORGOT PASSWORD
    @Post('forgot-password')
    forgotPassword(@Body() data: ForgotPasswordDto) {
        return this.authService.forgotPassword(data);
    }

    // RESET PASSWORD
    @Post('reset-password')
    resetPassword(@Body() data: ResetPasswordDto) {
        return this.authService.resetPassword(data);
    }
}