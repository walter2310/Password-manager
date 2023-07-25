import mongoose, { ConnectOptions } from 'mongoose';

// Sobrescribir el tipo ConnectOptions para incluir la opción useNewUrlParser
declare module 'mongoose' {
    interface ConnectOptions {
        useNewUrlParser?: boolean;
    }
}

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);

        console.log('Database is connected 💻');
    } catch (error) {
        console.log(error);
        throw new Error('Could not connect to database ');
    }
}
