// @flow
import render from "../renderer";
import fs from "fs";
import * as dataFile from "../route/data-file";

export default async (path: string): Promise<string> => {
    const result = await render(`post/${path}`);
    return await new Promise((resolve, reject) => {
        const out = `out${dataFile.post(path)}`;
        fs.writeFile(out, JSON.stringify(result), err => {
            if (err) reject(err);
            resolve(out);
        });
    });
};
