import { genSalt, hash, compare } from 'bcryptjs';

export class AuthService {
    static encryptPassword = async (password: string) => {
        const salt = await genSalt(10);
        return await hash(password, salt);
    };

    static comparePassword = async (password: string, hashedPassword: string) => {
        return await compare(password, hashedPassword);
    };
}
