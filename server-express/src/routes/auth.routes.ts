import passport from '@/auth/passport';
import { AuthHandler } from '@/handlers/auth.handlers';
import { validate } from '@/middlewares/validate';
import { AuthSchema } from '@/schemas/auth.schema';
import { imgUpload } from '@/utils/multer';
import { Router } from 'express';

const authRouter = Router();

authRouter.route('/register').post(
    imgUpload.single('avatar'),
    validate('body', AuthSchema.registerSchema),
    AuthHandler.register
);

authRouter.route("/login").post(
    passport.authenticate('local'),
    AuthHandler.login
);

export { authRouter };
