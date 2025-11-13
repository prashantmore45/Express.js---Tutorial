import express from "express";
import path from "path";
import { shortnerRoutes } from "./routes/shortner_routes.js";

const app = express();

const PORT = 3000;


app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(shortnerRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});