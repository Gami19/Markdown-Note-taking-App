import express, { type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import type { SaveData } from './type.js'
import { markdownToHtml , checkGrammar} from './service/note.js';
import { upload, uploadDir } from './service/uploadHander.js'


// Routerの設置
const router = express.Router()

// Health
router.get('/', (res: Response) => {
    res.send('Hello, Notes API!');
})

// store request
router.post('/notes', async(req: Request, res: Response) => {

    const saveData: SaveData = req.body;
    
    // get req
    const fileData = saveData.note;

    // file name
    const fileName = `${saveData.title}.md`;
    const filePath = path.join(uploadDir, fileName);

    // store in /public
    try{
        await fs.writeFile(filePath, fileData);
        res.send('Store file');
    } catch(error){
        console.log(error);
        res.status(400).send('Failed to save note')
    }
})

// get a list of MD
router.get('/notes',async(req: Request, res: Response) => {
    try{
        const readDir = await fs.readdir(uploadDir);
        res.json(readDir);
    }catch(error){
        console.log(error);
        res.status(400).send('Failed to get note')
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
            res.status(500).send('Failed to read the markdown file')
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
            res.status(500).send('Failed to check grammar')
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
            res.status(500).send('Failed to check grammar');
        }

    } else {
        res.status(400).send("Not params string");
    }
})

// uploaded .md
router.post('/notes/upload', upload.single('file'), async(req: Request, res: Response) => {
    if(! req.file){
        res.status(400).send("Not file");
        return;
    }
    res.send(`Upload ${req.file.originalname}!\n`);
})


export default router