import { z } from 'zod';

export class AuthSchema {
    static fullname = z
        .string()
        .min(3, { message: 'Full name must be at least 3 characters long' })
        .max(25, { message: 'Full name must be at most 25 characters long' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'Full name can only contain alphabets and whitespace' });

    static username = z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(25, { message: 'Username must be at most 25 characters long' })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: 'Username can only contain alphanumeric characters and underscores',
        });

    static email = z.string().email({ message: 'Invalid email address' });

    static password = z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .refine(
            (password) => {
                const hasAlphabet = /[a-zA-Z]/.test(password);
                const hasDigit = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

                return hasAlphabet && hasDigit && hasSpecialChar;
            },
            {
                message:
                    'Password must contain at least one alphabet character, one digit, and one special character',
            },
        );

    static avatarUrl = z.string({ message: "Invalid URL format for avatarUrl" });

    static registerSchema = z.object({
        fullname: this.fullname,
        email: this.email,
        password: this.password
    });
}
