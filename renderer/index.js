//@flow
import { isFile } from "../utils/is-file";
import * as markdown from "./markdown";
import * as path from "path";

export default (p: string): Promise<Exact<{ data: {}, body: {} }>> => {
    const base = `/${path.relative(process.cwd(), p)}`;
    return new Promise(async (resolve, reject) => {
        const mdDir = `${p}/index.md`;
        if (await isFile(mdDir)) {
            return resolve(await markdown.renderFile(mdDir, base));
        }
        const mdFile = `${p}.md`;
        if (await isFile(mdFile)) {
            return resolve(await markdown.renderFile(mdFile, base));
        }

        return reject(`no article file: ${p}`);
    });
};
