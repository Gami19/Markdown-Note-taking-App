import express, { type Express, type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';

const app: Express = express();
const port = 3000;

// 保存先パスを作成
const uploadDir = path.join(process.cwd(), 'public');

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Notes API!');
})

app.post('/notes', async(req: Request, res: Response) => {

    // data に格納
    const data = req.body.note;

    // ファイルタイトル
    const fileName = `${req.body.title}.md`;
    const filePath = path.join(uploadDir, fileName);

    // /public に保存
    await fs.writeFile(filePath, data, err => {
        if (err) {
            console.error(err);
        } else {
            res.send('メモを保存しました');
        }  
    })
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
});