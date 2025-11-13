import crypto from "crypto";
import { loadLinks, saveLinks } from "../model/shortner_model.js";


export const getShortnerURL = async(req, res) => {
    try {
        // const file = await readFile(path.join("views", "index.html"));
        const links = await loadLinks();

        return res.render("index", { links, host: req.headers.host });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}


export const pageURLshortner = async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await loadLinks();

        if (links[finalShortCode]) {
            return res.status(400).send("Short code already exists. Please choose another.");
        }

        links[finalShortCode] = url; 
        await saveLinks(links);

        return res.redirect("/");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }

};


export const redirectToOriginalURL = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();

        if (!links[shortCode]) return res.status(404).send("Short URL not found");

        return res.redirect(links[shortCode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};