import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path  from "path";
import { Router } from "express";

const router = Router();

const DATA_FILE = path.join("data", "links.json");

const loadLinks = async() => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links));
};


router.get("/", async(req, res) => {
    try {
        const file = await readFile(path.join("views", "index.html"));
        const links = await loadLinks();

        const content = file.toString().replaceAll("{{ shortened_urls }}", Object.entries(links).map(([code, url]) => 
            { 
                return `<li><a href="/${code}" target="_blank">${req.headers.host}/${code}</a> - ${url}</li>`;
            }).join("")
        );

        return res.send(content);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.post("/", async (req, res) => {
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

});

router.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();

        if (!links[shortCode]) return res.status(404).send("Short URL not found");

        return res.redirect(links[shortCode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


const shortnerRoutes = router;

export { shortnerRoutes };