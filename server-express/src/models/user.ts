import { getModelForClass, Prop } from '@typegoose/typegoose';

class User {
    @Prop()
    fullname!: string;

    @Prop({ unique: true })
    email!: string;

    @Prop()
    password!: string;

    @Prop()
    avatarUrl?: string;

    @Prop({ defautl: Date.now() })
    createdAt!: Date;
}

export type UserType = InstanceType<typeof UserModel>;

export const UserModel = getModelForClass(User);
