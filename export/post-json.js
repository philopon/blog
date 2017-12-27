// @flow

import render from "../renderer";
import fs from "fs";

export default async (path: string): Promise<void> => {
    const result = await render(`post/${path}`);
    return await new Promise((resolve, reject) => {
        fs.writeFile(`out/post/${path}/post.json`, JSON.stringify(result), err => {
            if (err) reject(err);
            resolve();
        });
    });
};
