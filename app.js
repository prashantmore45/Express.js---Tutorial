import express from 'express';
import {PORT} from './env.js';
import path from 'path';

const app = express();


app.get('/', (req, res) =>  {

    // console.log(import.meta.url);
    // const __filename = new URL(import.meta.url).pathname;
    // console.log(__filename);

    const HomePagePatH = path.join(import.meta.dirname, "public", "index.html");
    res.sendFile(HomePagePatH);

    
});


// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));