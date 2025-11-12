import express from 'express';
import {PORT} from './env.js';
import path from 'path';

const app = express();

// absolute path

const staticPath = path.join(import.meta.dirname, "public");

app.use("/public", express.static(staticPath));

// route paramreters in express

app.get("/profile/:username", (req, res) => {
    console.log(req.params);
    res.send(`<h1>Welcome to the profile of ${req.params.username}</h1>`);
});

app.get("/profile/:username/article/:slug", (req, res) => {
    console.log(req.params);
    res.send(`<h1>Viewing article ${req.params.slug} of user ${req.params.username}</h1>`); 
});

// query parameters in express

app.get("/product", (req, res) => {
    console.log(req.query);
    res.send(`<h1>Viewing product: ${req.query.name} with category: ${req.query.category}</h1>`);
});

app.get('/', (req, res) =>  {

    // console.log(import.meta.url);
    // const __filename = new URL(import.meta.url).pathname;
    // console.log(__filename);

    const HomePagePatH = path.join(import.meta.dirname, "public", "index.html");
    res.sendFile(HomePagePatH);

    
});


// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));