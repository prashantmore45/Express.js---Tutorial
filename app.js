import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));

app.get('/about', (req, res) => res.send('<h1>About Page</h1>'));

app.get('/contact', (req, res) => res.send('<h1>Contact Page</h1>'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));