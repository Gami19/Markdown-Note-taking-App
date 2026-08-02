// UploadHandler
import multer from 'multer';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export const uploadDir = path.join(process.cwd(), 'public')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true })
          }
          cb(null, uploadDir)
        
    },
    // アップロードされるファイル名を作成
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const name = file.originalname.toLowerCase()
        if (name.endsWith('.md')) {
          cb(null, true)   // 許可
          return
        }
        cb(new Error('Only .md files are allowed')) 
    },
});
