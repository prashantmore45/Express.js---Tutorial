// import { readFile, writeFile } from "fs/promises";
// import path from "path";


// const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async() => {
//     try {
//         const data = await readFile(DATA_FILE, "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         if (error.code === "ENOENT") {
//             await writeFile(DATA_FILE, JSON.stringify({}));
//             return {};
//         }
//         throw error;
//     }
// };

// export const saveLinks = async (links) => {
//     await writeFile(DATA_FILE, JSON.stringify(links));
// };


import { client } from "../config/db-client.js";
import { envSchema } from "../config/env.js";

const db = client.db(envSchema.MONGODB_DB_NAME);
const shortnerCollection = db.collection("shortners");

export const loadLinks = async () => {
    return await shortnerCollection.find().toArray();
};

export const saveLinks = async (link) => {
    return await shortnerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortCode) => {
    return await shortnerCollection.findOne({ shortCode });
};