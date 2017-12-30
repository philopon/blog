// @flow
import { renderFile } from "../renderer";
import fs from "fs";
import { writeFile } from "../utils/file-promise";
import { dirname } from "path";

export default async ({ file, route }: { file: string, route: string }): Promise<string> => {
    const result = await renderFile(file, `${dirname(route)}/`);
    const out = `out${route}`;
    await writeFile(out, JSON.stringify(result));
    return out;
};
