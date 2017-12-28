// @flow
import list from "./list";
import post_json from "./post-json";
import fs from "fs";
import path from "path";

const copyFile = (src: string, dst: string): Promise<string> =>
    new Promise((resolve, reject) => {
        (fs: any).copyFile(src, dst, err => {
            if (err) return reject(err);
            resolve(dst);
        });
    });

const writeFile = (path, txt): Promise<string> =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, txt, err => {
            if (err) return reject(err);
            resolve(path);
        });
    });

(async () => {
    const { posts, statics } = await list();
    const result = await Promise.all([
        writeFile("out/.nojekyll", ""),
        ...posts.map(p => post_json(p)),
        ...statics.map(p => copyFile(p, path.join("out", p))),
    ]);
    for (const file of result) {
        console.log(`asset set: ${file}`);
    }
})();
