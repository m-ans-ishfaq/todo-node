import { getModelForClass, Prop } from '@typegoose/typegoose';

class Todo {
    @Prop()
    task!: string;

    @Prop({ default: false })
    completed!: boolean;

    @Prop({ defautl: Date.now() })
    createdAt!: Date;

    @Prop()
    completedAt?: Date;
}

export const ToDoModel = getModelForClass(Todo);
