// @flow
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";

import * as fs from "fs";
import grayMatter from "gray-matter";
import modifyLink from "./modify-link";
import modifyData, { Data } from "./data";
import { readFile } from "../utils/file-promise";

const processor = unified()
    .use({ settings: { position: false } })
    .use(markdown)
    .use(remark2rehype);

export const renderString = async (
    txt: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    const data = grayMatter(txt);
    const mdAST = processor.parse(data.content);
    const hAST = await processor.run(mdAST);
    modifyLink(hAST, base);
    return { data: modifyData(data.data), body: hAST };
};

export const renderFile = async (
    path: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    const content = await readFile(path);
    return await renderString(content.toString(), base);
};
