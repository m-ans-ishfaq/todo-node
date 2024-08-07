import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import { morganMiddleware } from '@/middlewares/morgan';
import { indexRouter } from '@/routes/index.routes';
import { logger } from '@/utils/logger';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectToDatabase } from './utils/dbConn';
import { rateLimit } from 'express-rate-limit';
import { authRouter } from './routes/auth.routes';
import { doubleCsrf } from 'csrf-csrf';
import passport from 'passport';
import "@/auth/passport";

dotenv.config();

const app = express();

// Essential Middlewares
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 100, // 100 requests under 1 minute
        standardHeaders: 'draft-7',
        legacyHeaders: false,
    }),
);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
            signed: true,
        },
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URI,
        }),
    }),
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(doubleCsrfProtection);
app.use(morganMiddleware);

// Routers
app.use('/', indexRouter);
app.use('/auth', authRouter);

connectToDatabase();
app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server is running !`);
});
