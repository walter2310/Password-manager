
import multer from "multer";
import express from 'express';
import { extname } from 'path'
import * as uploadControllers from '../controllers/uploadFile';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    }
})

const upload = multer({ storage });

router.post('/:id', upload.single('avatar'), uploadControllers.uploadFileToDB);

export default router;