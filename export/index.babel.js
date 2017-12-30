// @flow
import list from "./list";
import post from "./post";
import fs from "fs";
import path from "path";
import { copyFile, writeFile } from "../utils/file-promise";

export default async () => {
    const { posts, statics } = await list();
    const result = await Promise.all([
        writeFile("out/.nojekyll", "").then(() => ".nojekyll"),
        ...posts.map(p => post(p)),
        ...statics.map(p => copyFile(p.file, path.join("out", p.route))),
    ]);
    for (const file of result) {
        console.log(`asset set: ${file}`);
    }
};
