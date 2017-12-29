// @flow
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";

import * as fs from "fs";
import grayMatter from "gray-matter";
import modifyLink from "./modify-link";
import modifyData, { Data } from "./data";
import { readFile } from "../utils/file-promise";

export const renderString = async (
    txt: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    const { data, content } = grayMatter(txt);
    const processor = unified()
        .use(markdown, { position: false })
        .use(remark2rehype)
        .use(modifyLink, { base });

    const body = await processor.run(processor.parse(content));
    return { data: modifyData(data), body };
};

export const renderFile = async (
    path: string,
    base: string
): Promise<Exact<{ data: Data, body: {} }>> => {
    const content = await readFile(path);
    return await renderString(content.toString(), base);
};
