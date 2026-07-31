import express, { type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import type { SaveData } from './type.js'
import { markdownToHtml , checkGrammar} from './services.js';

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

// get a specific MD 
router.get('/notes/:filename', async(req: Request, res: Response) => {

    // get parameters
    const targetFile= req.params.filename

    // check params
    if (typeof targetFile === "string"){

        const markdownPath = path.join(uploadDir, `${targetFile}.md`);

        // read the MD
        try{
            const fileContent = await fs.readFile(markdownPath, 'utf-8');
            res.send(fileContent);
            console.log('Sent Markdown');
        }catch(error){
            console.log(error);
        }

    } else {
        res.status(400).send("Not params string");
    }

})

// get the content as HTML
router.get('/notes/:filename/html', async(req: Request, res: Response) => {
    // get parameters
    const targetFile= req.params.filename;
    
    // check params
    if (typeof targetFile === "string"){

        const markdownPath = path.join(uploadDir, `${targetFile}.md`);

        // read the MD
        try{
            const fileContent = await fs.readFile(markdownPath, 'utf-8');

            // render html
            const htmlContent = markdownToHtml(fileContent);
            res.send(htmlContent)
            console.log('Sent HTML response')
        }catch(error){
            console.log(error);
        }

    } else {
        res.status(400).send("Not params string");
    }


})

// fix the grammar of html
router.get('/notes/:filename/fix', async(req: Request, res: Response) => {
    // get parameters
    const targetFile= req.params.filename;
    
    // check params
    if (typeof targetFile === "string"){

        const markdownPath = path.join(uploadDir, `${targetFile}.md`);

        // read the MD
        try{
            const fileContent = await fs.readFile(markdownPath, 'utf-8');


            // fix the grammar of html
            const linterResults = await checkGrammar(fileContent,markdownPath);
            res.json(linterResults);

        }catch(error){
            console.log(error);
        }

    } else {
        res.status(400).send("Not params string");
    }
})


export default router