import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Notes API!');
})

app.post('/notes', (req: Request, res: Response) => {
    console.log(req.body)
    res.send('メモを受け取りました');
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
});