//@flow
import { isFile } from "../utils/is-file";
import * as markdown from "./markdown";

export default (path: string): Promise<Exact<{ data: {}, body: {} }>> => {
    return new Promise(async (resolve, reject) => {
        const mdDir = `${path}/index.md`;
        if (await isFile(mdDir)) {
            return resolve(await markdown.renderFile(mdDir));
        }
        const mdFile = `${path}.md`;
        if (await isFile(mdFile)) {
            return resolve(await markdown.renderFile(mdFile));
        }

        return reject(`no article file: ${path}`);
    });
};
