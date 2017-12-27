// @flow
import list from "./list";
import post_json from "./post-json";
import fs from "fs";
import path from "path";

const copyFile = (src: string, dst: string): Promise<string> =>
    new Promise((resolve, reject) => {
        fs.copyFile(src, dst, err => {
            if (err) return reject(err);
            resolve(dst);
        });
    });

(async () => {
    const { posts, statics } = await list();
    const result = await Promise.all([
        ...posts.map(p => post_json(p)),
        ...statics.map(p => copyFile(p, path.join("out", p))),
    ]);
    for (const file of result) {
        console.log(`asset set: ${file}`);
    }
})();
