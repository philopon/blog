// @flow
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";

import * as fs from "fs";
import grayMatter from "gray-matter";
import modifyLink from "./modify-link";

const processor = unified()
    .use({ settings: { position: false } })
    .use(markdown)
    .use(remark2rehype);

export const renderString = (txt: string, base: string): Promise<Exact<{ data: {}, body: {} }>> => {
    return new Promise(async resolve => {
        const data = grayMatter(txt);
        const mdAST = processor.parse(data.content);
        const hAST = await processor.run(mdAST);
        modifyLink(hAST, base);
        const result = { data: data.data, body: hAST };
        resolve(result);
    });
};

export const renderFile = (path: string, base: string): Promise<Exact<{ data: {}, body: {} }>> => {
    return new Promise(async (resolve, reject) => {
        fs.readFile(path, (err, content) => {
            if (err) return reject(err);
            renderString(content.toString(), base).then(resolve);
        });
    });
};
