import express, { type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import type { SaveData } from './type.js'

// 保存先パスを作成
const uploadDir = path.join(process.cwd(), 'public');

// Routerの設置
const router = express.Router()

// Health
router.get('/', (res: Response) => {
    res.send('Hello, Notes API!');
})

// store request
router.post('/notes', async(req: Request, res: Response) => {

    const saveData: SaveData = req.body;
    
    // リクエストを保持
    const fileData = saveData.note;

    // ファイルタイトル
    const fileName = `${saveData.title}.md`;
    const filePath = path.join(uploadDir, fileName);

    // /public に保存
    try{
        await fs.writeFile(filePath, fileData);
        res.send('メモを保存しました');
    } catch(error){
        console.log(error);
    }
})

// get a list of MD
router.get('/notes',async(req: Request, res: Response) => {
    try{
        const readDir = await fs.readdir(uploadDir);
        res.json(readDir);
    }catch(error){
        console.log(error);
    }
})

export default router