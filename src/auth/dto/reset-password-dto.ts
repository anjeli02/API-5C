export class ResetPasswordDto {
    readonly token: string;
    readonly password: string;
    readonly passwordConfirmation: string;
}