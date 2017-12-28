//@flow
import { isFile } from "../utils/file-promise";
import * as markdown from "./markdown";
import * as path from "path";
import { Data } from "./data";

const renderMarkdown = async (
    p: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    if (await isFile(p)) {
        return markdown.renderFile(p, base);
    } else {
        throw new Error(`no article file: ${p}`);
    }
};

export default async (p: string): Promise<Exact<{ data: Data, body: {} }>> => {
    const base = `/${path.relative(process.cwd(), p)}`;
    const mdDir = `${p}/index.md`;
    if (await isFile(mdDir)) {
        return await markdown.renderFile(mdDir, base);
    }
    const mdFile = `${p}.md`;
    if (await isFile(mdFile)) {
        return await markdown.renderFile(mdFile, base);
    }
    throw new Error(`no article file: ${p}`);
};
