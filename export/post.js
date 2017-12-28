// @flow
import render from "../renderer";
import fs from "fs";
import * as dataFile from "../route/data-file";
import { writeFile } from "../utils/file-promise";

export default async (path: string): Promise<string> => {
    const result = await render(`post/${path}`);
    const out = `out${dataFile.post(path)}`;
    await writeFile(out, JSON.stringify(result));
    return out;
};
