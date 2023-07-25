import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    img: string;
    secretKey: string
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    img: { type: String, default: 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@download/image/default_display_picture.png' },
    secretKey: { type: String, required: true },
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
