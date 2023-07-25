import mongoose, { Document, Schema } from 'mongoose';

interface IPassword extends Document {
    serviceName: string;
    password: string,
    user: string
};

const passwordSchema = new Schema<IPassword>({
    serviceName: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: String }
});

const Password = mongoose.model<IPassword>('Password', passwordSchema);

export default Password;