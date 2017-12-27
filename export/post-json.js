// @flow

import render from "../renderer";
import fs from "fs";

export default async (path: string): Promise<string> => {
    const result = await render(`post/${path}`);
    return await new Promise((resolve, reject) => {
        const out = `out/post/${path}/post.json`;
        fs.writeFile(out, JSON.stringify(result), err => {
            if (err) reject(err);
            resolve(out);
        });
    });
};
