import express, { type Express, type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

const app: Express = express();
const port = 3000;

// 保存先パスを作成
const uploadDir = path.join(process.cwd(), 'public');

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Notes API!');
})

app.post('/notes', async(req: Request, res: Response) => {

    // リクエストを保持
    const fileData = req.body.note;

    // ファイルタイトル
    const fileName = `${req.body.title}.md`;
    const filePath = path.join(uploadDir, fileName);

    // /public に保存
    try{
        await fs.writeFile(filePath, fileData);
        res.send('メモを保存しました');
    } catch(error){
        console.log(error);
    }
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
});