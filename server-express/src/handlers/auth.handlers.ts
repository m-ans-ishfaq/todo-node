import { generateToken } from '@/auth/csrf';
import { UserModel } from '@/models/user';
import { AuthSchema } from '@/schemas/auth.schema';
import { AuthService } from '@/services/auth.service';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { z } from 'zod';
import { config  } from 'dotenv';
config();

export class AuthHandler {

    static register = async (req: Request<{},{}, z.infer<typeof AuthSchema.registerSchema>>, res: Response) => {
        const { fullname, password, email } = req.body;
        const { file: avatar } = req;
        let avatarUrl: string|null = '';
        if (avatar) {
            if (process.env.FILE_UPLOAD == 'CLOUD') {
                avatarUrl = avatar?.path;
            } else {
                avatarUrl = `/uploads/images/${avatar}`;
            }
        } else {
            avatarUrl = null;
        }
        const hashedPassword = await AuthService.encryptPassword(password);
        try {
            const newUser = new UserModel({
                fullname,
                email,
                password: hashedPassword,
                avatarUrl
            });
            await newUser.save();
            res.sendStatus(201);
        } catch (err) {
            const error = err as any;
            if (error.code === 11000) {
                res.status(401).send("DUPLICATE_ENTITY");
            }
        }
    }

    static login = async (req: Request, res: Response) => {
        res.sendStatus(200);
    }
}
