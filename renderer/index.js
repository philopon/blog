//@flow
import { isFile } from "../utils/file-promise";
import * as markdown from "./markdown";
import * as path from "path";
import { Data } from "./data";
import canonicalize from "../utils/canonicalize-path";

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

export const renderFile = async (
    p: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    const ext = path.extname(p);
    if (ext === ".md") {
        return await markdown.renderFile(p, base);
    }
    throw new Error(`unknown extension: ${ext}`);
};

export const renderRoute = async (base: string): Promise<Exact<{ data: Data, body: {} }>> => {
    base = canonicalize(base);
    const mdDir = `.${base}/index.md`;
    if (await isFile(mdDir)) {
        return await markdown.renderFile(mdDir, base);
    }
    const mdFile = `.${base}.md`;
    if (await isFile(mdFile)) {
        return await markdown.renderFile(mdFile, base);
    }
    throw new Error(`no article file: ${base}`);
};
