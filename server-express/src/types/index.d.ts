import { UserType } from '@/models/user';
import { Document, Types } from 'mongoose';
import { User as PassportUser } from 'passport';

declare global {
    namespace Express {
        interface User extends PassportUser, Document, UserType {}
    }
}