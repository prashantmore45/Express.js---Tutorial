import express from 'express';
import path from 'path';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const app = express();
const PORT = 4000;

const StaticPath = path.join(import.meta.dirname, "formsubmission");

app.use(express.static(StaticPath));

app.use(express.urlencoded({ extended: true}));

//Using get method

// app.get("/contact", (req, res) => {
//     console.log(req.query);
//     res.redirect("/");
// });

// Using post method

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.redirect("/")
})






app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});