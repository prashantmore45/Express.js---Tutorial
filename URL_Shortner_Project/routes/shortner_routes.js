import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path  from "path";
import { Router } from "express";
import { name } from "ejs";

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


router.get("/report", (req, res) => {

    const student = [
        {
            name: "Prashant More",
            roll_no: "48",
            branch: "Computer Science",
            year: "2025"
        }, {
            name: "Deepak Kumar",
            roll_no: "52",
            branch: "Mechanical Engineering",
            year: "2025"
        }, {
            name: "Anjali Singh",
            roll_no: "60",
            branch: "Electrical Engineering",
            year: "2025"
        }, {
            name: "Riya Patel",
            roll_no: "73",
            branch: "Civil Engineering",
            year: "2025"
        }, {
            name: "Amit Sharma",
            roll_no: "85",
            branch: "Chemical Engineering",
            year: "2025"
        }, {
            name: "Sneha Gupta",
            roll_no: "91",
            branch: "Biotechnology",
            year: "2025"
        }, {
            name: "Vikram Joshi",
            roll_no: "97",
            branch: "Aerospace Engineering",
            year: "2025"
        }, {
            name: "Pooja Reddy",
            roll_no: "102",
            branch: "Information Technology",
            year: "2025"
        }, {
            name: "Karan Mehta",
            roll_no: "110",
            branch: "Electronics Engineering",
            year: "2025"
        }, {
            name: "Nisha Verma",
            roll_no: "118",
            branch: "Environmental Engineering",
            year: "2025"
        }, {
            name: "Rohit Kapoor",
            roll_no: "125",
            branch: "Industrial Engineering",
            year: "2025"
        }, {
            name: "Sonal Dixit",
            roll_no: "132",
            branch: "Materials Science",
            year: "2025"
        }, {
            name: "Ajay Nair",
            roll_no: "140",
            branch: "Nuclear Engineering",
            year: "2025"
        }, {
            name: "Maya Iyer",
            roll_no: "148",
            branch: "Petroleum Engineering",
            year: "2025"
        }, {
            name: "Tarun Gill",
            roll_no: "155",
            branch: "Robotics Engineering",
            year: "2025"
        }
    ];

    return res.render("report", { student });
});


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