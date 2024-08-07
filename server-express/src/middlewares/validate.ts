import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    (type: 'body' | 'query' | 'param', schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[type]);
            next();
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: error,
            });
        }
    };
