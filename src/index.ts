import express, { type Express } from 'express';
import router from './route.js'

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(router)

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
});