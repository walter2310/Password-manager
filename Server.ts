import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from './routes/userRoutes';
import passdorRoutes from './routes/passwordRoutes';
import uploadRoute from './routes/fileUploadRoute';

import { dbConnection } from "./DB/config";

class Server {
    private app: Application;
    private port: string;

    private paths = {
        users: '/users',
        passwords: '/passwords',
        upload: '/uploadfile'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5050';
       
        this.DB();
        this.middlewares();
        this.routes();
    };

    async DB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev')); 
        this.app.use(express.json());       
    };

    routes() {
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.passwords, passdorRoutes);
        this.app.use(this.paths.upload, uploadRoute);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port} 🚀`)
        });
    }
};


export default Server;