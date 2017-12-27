// @flow
import list from "./list";
import post_json from "./post-json";
import fs from "fs";
import path from "path";

const copyFile = (src: string, dst: string): Promise<void> =>
    new Promise((resolve, reject) => {
        fs.copyFile(src, dst, err => {
            if (err) return reject(err);
            resolve();
        });
    });

(async () => {
    const { posts, statics } = await list();
    await Promise.all([
        ...posts.map(p => post_json(p)),
        ...statics.map(p => copyFile(p, path.join("out", p))),
    ]);
})();
